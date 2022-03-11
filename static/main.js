//Assign a canvas for pixi to use
const canvas = document.getElementById('mycanvas');

//Create a renderer and assign resize event
const renderer = new PIXI.Renderer({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0x808080
})
resize();
window.addEventListener('resize', resize);

//Create a main container
const stage = new PIXI.Container();

function play() {
    renderer.render(stage);
}

let state = play

let card = new Card(new Vector(1, 2));
card.graphics.x = 200
card.graphics.y = 200

//Main loop
function gameLoop(){
    state()
}

//Create the ticker and start it
const ticker = new PIXI.Ticker();
ticker.add(gameLoop);
ticker.start();