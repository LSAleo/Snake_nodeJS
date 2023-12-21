window.onload = function() {
    let snake
    let apple
    let defeat
    let block_size
    let canvas_height = 600
    let canvas_width = 900
    let ctx
    let delay  = 500
    let score = 0

    init();

    function init() {
        let canvas = document.createElement('canvas')
        canvas.width = canvas_width
        canvas.height = canvas_height
        canvas.style.border = "30px solid gray"
        canvas.style.border = "50px auto"
        canvas.style.backgroundColor = "#ddd"
        canvas.style.display = "block"
        canvas.style.margin = "auto"
        document.body.appendChild(canvas)
        ctx = canvas.getContext('2d')
        snake = new Snake ([[6,4],[5,4],[4,4]], "right")
        score = 0
        apple = new Apple([10,10])
        refreshCanvas()
    }

    function refreshCanvas(){

    }

    function Snake() {

    }

    function Apple() {

    }

    function game_over(){

    }

    function restart() {
        score = 0
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
        snake.setDirection(newDirection)
    }
}