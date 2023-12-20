window.onload = function() {
    let bob
    let canvasWidth = 900
    let canvasHeight = 600
    let blockSize = 30
    // let apple
    let score
    let timer
    let center
    let ctx
    // let tempsParDefaut
    let defeat
    let delay = 1000
    let widthBlocks = canvasWidth/blockSize
    let heightBlocks = canvasHeight/blockSize

    init();

    function init() {
        let canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvas.style.border = "30px solid gray"
        canvas.style.border = "50px auto"
        canvas.style.backgroundColor = "#ddd"
        canvas.style.display = "block"
        document.body.appendChild(canvas)
        ctx = canvas.getContext('2d')
        bob = new Snake ([[6,4],[5,4],[4,4]], "right")
        score = 0
        apple = new Apple([10,10])
        refreshCanvas()
    }

    function gameOver(){

    }

    function restart() {
    
    }

    function drawScore(){

    }

    function drawBlock(ctx, position){
        let x = position[0] * blockSize
        let y = position[1] * blockSize
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    function timeGame(){

    }

    function collision(){

    }

    function Apple(position){
        this.position = position
        this.draw = function(){
            ctx.save()
            ctx.fillStyle = "green"
            ctx.beginPath()
            let radius = blockSize/2
            let x = this.position[0]*blockSize + radius
            let y = this.position[1]*blockSize + radius
            ctx.arc(x,y, radius, 0, Math.PI*2, true)
            ctx.fill()
            ctx.restore()
        }

        this.setNewPosition = function(){
            let newX = Math.round(Math.random() * (widthBlocks -1))
            let newY = Math.round(Math.random() * (heightBlocks -1))
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

    function Snake(body, direction){
        this.body = body
        // this.direction = direction
        this.draw = function(){
           ctx.save()
           ctx.fillstyle = "green"
           for(let i=0; i < this.body.length; i++){
            drawBlock(ctx, this.body[i])
           }
           ctx.restore()
        }
        this.advance = function(direction){
            let nextPosition = this.body[0].slice()
            switch  (this.direction) {
                case "left":
                    nextPosition[0] --
                    break;
                case "right":
                    nextPosition[0] ++
                    break;
                case "down":
                    nextPosition[1] ++
                    break;
                case "up":
                    nextPosition[1] --
                    break;
                default:
                    break;
            }
            this.body.unshift(nextPosition)
            if(!this.eatApple){
                this.body.pop()
            }else{
                this.eatApple = false
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
            // if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection
            // }
        }

        this.checkCollision = function(){
            let collision = false
            let head = this.body[0]
            let snakeX = head[0]
            let snakeY = head[1]
            let minX = 0
            let minY = 0
            let maxX = widthBlocks - 1
            let maxY = heightBlocks - 1
            if (snakeX < minX || snakeY < minY || snakeX > maxX || snakeY > maxY){
                gameOver()
            }
        }
        this.isEaingApple = function(appleToEat){
            let head = this.body[0]
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
                return true
            }else{
                return false
            }
        }
    }

    function refreshCanvas(){
        if(bob.isEatingApple(apple)){
            score++
            bob.eatApple = true
            do{
                apple.setNewPosition()
            } while(apple.isOnSnake(bob))
        }
        ctx.clearRect(0,0,canvasWidth,canvasHeight)
        ctx.fillStyle = "red"
        bob.advance()
        bob.draw()
        apple.draw()
        bob.checkCollision()
        if(bob.checkCollision()){
            clearTimeout()
        }else{
            setTimeout(refreshCanvas, delay)
        }
    }

    document.onkeydown = function handleKeyDown(e){
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
        bob.setDirection(newDirection)
    }
}