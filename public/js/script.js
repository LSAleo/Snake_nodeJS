window.onload = function() {
    let serpent
    let canvasWidth = 900
    let canvasHeight = 600
    let blockSize = 30
    let pomme
    let score
    let temps
    let centre
    let ctx
    // let tempsParDefaut
    let defaite

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
        score = 0
        rafraichirCanva()
    }

    function perdu(){

    }

    function affichageScore(){

    }

    function affichageBlock(){

    }

    function tempsDePartie(){

    }

    function collision(){

    }

    function affichagePomme(position){
        this.position = position
        this.draw = function(){
            ctx.beginPath()
            ctx.fillstyle = "red"
            let radius = radius/2
            let x = this.position[0]*blockSize + radius
            let y = this.position[1]*blockSize + radius
        }
    }

    function affichageBob(){

    }

    function rafraichirCanva(){

    }
}