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
        bob = new Snake ([[6,4],[5,4],[4,4]])
        score = 0
        refreshCanvas()
    }

    function gameOver(){

    }

    function restart() {
    
    }

    function drawScore(){

    }

    function drawBlock(){
        let x = position[0] * blockSize
        let y = position[1] * blockSize
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    function timeGame(){

    }

    function collision(){

    }

    function apple(position){
        this.position = position
        this.draw = function(){
            ctx.save()
            ctx.fillstyle = "red"
            ctx.beginPath()
            let radius = radius/2
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
        this.advance = function(){
            let nextPosition = this.body[0].slice()
            nextPosition[0]++
            this.body.unshift(nextPosition)
            this.body.pop()
        }
    }

    function refreshCanvas(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight)
        ctx.fillStyle = "red"
        bob.advance()
        bob.draw()
        setTimeout(refreshCanvas, delay)
    }

    document.onkeydown = function handleKeyDown(e){
        let key = e.code
        let newDirection
        switch (key) {
            case ArrowLeft:
                newDirection = "left"
            break;

            case ArrowUp:
                newDirection = "up"
            break;

            case ArrowRight:
                newDirection = "right"
            break;

            case ArrowDown:
                newDirection = "down"
            break;

            case Space:
                restart()
                return
        
            default:
                return;
        }
        blob.setDirection(newDirection)
    }
}