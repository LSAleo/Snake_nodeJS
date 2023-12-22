window.onload = function() {
    let snake
    let apple
    let defeat = false
    let block_size = 30
    let canvas_height = 600
    let canvas_width = 900
    let ctx
    let delay = 100
    let score = 0
    let width_blocks = canvas_width/block_size
    let height_blocks = canvas_height/block_size

    init();

    function init() {
        let canvas = document.createElement('canvas')
        canvas.width = canvas_width
        canvas.height = canvas_height
        canvas.style.border = "30px solid black"
        canvas.style.border = "50px auto"
        canvas.style.backgroundColor = "#DDDDDD"
        canvas.style.display = "block"
        canvas.style.margin = "auto"
        document.body.appendChild(canvas)
        ctx = canvas.getContext('2d')
        snake = new Snake ([[6,4],[5,4],[4,4]], "right")
        score = 0
        apple = new Apple([10,10])
        refreshCanvas()
    }

    function refreshCanvas() {
        if(snake.isEatingApple(apple)){
            score++
            snake.eatApple = true
            do{
                apple.setNewPosition()
            } while(apple.isOnSnake(snake))
        }
        ctx.clearRect(0,0,canvas_width,canvas_height)
        ctx.fillStyle = "red"
        snake.checkCollision()
        snake.advance()
        snake.draw()
        apple.draw()
        draw_score()
        if(snake.checkCollision() == true){
            clearTimeout()
        }else{
            setTimeout(refreshCanvas, delay)
        }
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction
        this.eatApple = false

        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "green";
            for (let i = 0; i < this.body.length; i++) {
                draw_block(ctx, this.body[i]);
            }
            ctx.restore();
        }
        this.advance = function() {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                default:
                    break;
            }
            this.body.unshift(nextPosition);
            if (!this.eatApple) {
                this.body.pop();
            } else {
                this.eatApple = false;
            }
        }        
        this.setDirection = function(newDirection){
            let allowedDirections
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"]
                    break;
                case "up":
                case "down":
                    allowedDirections = ["left", "right"]
                    break;
            
                default:
                    break;
            }
            this.direction = newDirection
        }

        this.checkCollision = function(){
            let collision = false
            let head = this.body[0]
            let corps = this.body.slice(1)
            let snakeX = head[0]
            let snakeY = head[1]
            let minX = 0
            let minY = 0
            let maxX = width_blocks - 1
            let maxY = height_blocks - 1
            if (snakeX > maxX || snakeY > maxY || snakeX < minX || snakeY < minY){
                defeat = true
                text_game_over = "Le serpent s'est manger un mur ! "
            }
            for (let i = 0; i < corps.length; i++){
                if(snakeX === corps[i][0] && snakeY === corps[i][1]){
                    text_game_over = "Le serpent s'est manger lui même ! "
                    defeat = true
                }
            }
            return defeat
        }
        this.isEatingApple = function(appleToEat){
            let head = this.body[0]
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
                return true
            }else{
                return false
            }
        }
    }

    function Apple(position) {
        this.position = position
        this.draw = function(){
            ctx.save()
            ctx.fillStyle = "red"
            ctx.beginPath()
            let radius = block_size/2
            let x = this.position[0]*block_size + radius
            let y = this.position[1]*block_size + radius
            ctx.arc(x,y, radius, 0, Math.PI*2, true)
            ctx.fill()
            ctx.restore()
        }

        this.setNewPosition = function(){
            let newX = Math.round(Math.random() * (width_blocks -1))
            let newY = Math.round(Math.random() * (height_blocks -1))
            this.position = [newX, newY]
        }
        this.isOnSnake = function(snakeToCheck) {
            let isOnSnake = false
            for(let i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    isOnSnake = true
                }
            }
            return isOnSnake
        }
    }

    function game_over() {
        defeat = true;
        clearTimeout();
        alert("Game Over! Score: " + score);
        restart();
    }

    function restart() {
        defeat = false;
        snake = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        score = 0;
        apple = new Apple([10, 10]);
        refreshCanvas();
    }

    /******************************************** DRAW *****************************************/

    function draw_score() {
        ctx.save()
        ctx.font = "bold 20px sans-serif"; 
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        let scoreText = "Score: " + score.toString();
        ctx.fillText(scoreText, 10, 10); 
        ctx.restore();
    }
    

    function draw_block(ctx, position){
        let x = position[0] * block_size
        let y = position[1] * block_size
        ctx.fillRect(x, y, block_size, block_size)
    }












    document.onkeydown = function handleKeyDown(e) {
        let key = e.code
        let newDirection
        switch (key) {
            case "ArrowLeft":
                newDirection = "left"
            break;

            case "ArrowUp":
                newDirection = "up"
            break;

            case "ArrowRight":
                newDirection = "right"
            break;

            case "ArrowDown":
                newDirection = "down"
            break;

            case "Space":
                restart()
                return
        
            default:
                return;
        }
        snake.setDirection(newDirection)
    }
}