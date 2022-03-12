//Assign a canvas for pixi to use
const canvas = document.getElementById('mycanvas');

const ASPECT = [4, 3];
const RESOLUTION = 720;

//Create a renderer and assign resize event
const renderer = new PIXI.Renderer({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0x606060
})
resize();
window.addEventListener('resize', resize);

//Create a main container
const stage = new PIXI.Container();

//initialize board
const board_container = new PIXI.Container();
const board_graphics = new PIXI.Graphics();
let board = [];
board_graphics.lineStyle(6, 0x000000);
board_graphics.beginFill(0x707080);
const board_width = 750;
board_graphics.drawRoundedRect(0, 0, board_width, board_width, 50);
board_graphics.endFill();
const margin = 130;
for (let row = 0; row < 7; row++) {
    board.push([]);
    for (let col = 0; col < 7; col++) {
        let radius = 40;
        board[row].push(null);
        if (col == 3 && (row == 0 || row == 6)) {
            radius = 30
            board_graphics.lineStyle(6, 0x606080);
            board_graphics.drawCircle(margin / 2 + (board_width - margin) / 6 * col, margin / 2 + (board_width - margin) / 6 * row, 40);
            board_graphics.drawCircle(margin / 2 + (board_width - margin) / 6 * col, margin / 2 + (board_width - margin) / 6 * row, 50);
        }
        board_graphics.lineStyle(0);
        board_graphics.beginFill(0x606080);
        board_graphics.drawCircle(margin / 2 + (board_width - margin) / 6 * col, margin / 2 + (board_width - margin) / 6 * row, radius);
        board_graphics.endFill();
    }
}
board_container.position.set(900, 320)
board_container.addChild(board_graphics);
stage.addChild(board_container);

const vector_colors = [0x0000FF, 0xFF0000];

//initialize cards
const card_positions = [new Vector(1100, 1240), new Vector(1450, 1240)];
const opp_card_positions = [new Vector(1100, 160), new Vector(1450, 160)];
const next_card_positions = [new Vector(350, 695), new Vector(700, 695)];


for (let i = 0; i < 6; i++) {
    let x = 0;
    let y = 0;
    while (x == 0 && y == 0) {
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
    }
    new Card(new Vector(x, y), Math.floor(i / 2), i % 2);
}

//initialize tokens
const friendly_color = 0x00FF00;
const enemy_color = 0xFF69B4;

for (let col = 0; col < 7; col++) {
    let king = false;
    if (col == 3) {
        king = true;
    }
    board[0][col] = new Unit(new Vector(col, 0), false, king);
    board[6][col] = new Unit(new Vector(col, 6), true, king);
}

//initialize selection icons
let selects = [new PIXI.Graphics(), new PIXI.Graphics()];
selects[0].lineStyle(10, vector_colors[0]);
selects[1].lineStyle(10, vector_colors[1]);
selects[0].drawRoundedRect(-125, -165, 250, 330, 55);
selects[1].drawRoundedRect(-125, -165, 250, 330, 55);
selects[0].position.set(card_positions[0].x, card_positions[0].y);
selects[1].position.set(card_positions[1].x, card_positions[1].y);
stage.addChild(selects[0]);
stage.addChild(selects[1]);

let reflects = [PIXI.Sprite.from('static/x-1.png'), PIXI.Sprite.from('static/x-1.png')];
reflects[0].position.set(card_positions[0].x + 100, card_positions[0].y + 100);
reflects[1].position.set(card_positions[1].x + 100, card_positions[1].y + 100);
reflects[0].anchor.set(0.5, 0.5);
reflects[1].anchor.set(0.5, 0.5);
reflects[0].visible = false;
reflects[1].visible = false;
stage.addChild(reflects[0]);
stage.addChild(reflects[1]);

let eliminate = PIXI.Sprite.from('static/eliminate.png');
eliminate.anchor.set(0.5, 0.5);
eliminate.visible = false;
board_container.addChild(eliminate);

let board_select = new PIXI.Graphics();
board_select.lineStyle(6, vector_colors[0]);
board_select.drawCircle(0, 0, 50);
board_select.visible = false;
board_container.addChild(board_select);

let previews = [new Preview(vector_colors[0]), new Preview(vector_colors[1])];



function play() {
    let scale = renderer.screen.height / 1440;
    stage.scale.set(scale, scale);
    renderer.render(stage);
}

let state = play

//Main loop
function gameLoop(){
    state()
}

//Create the ticker and start it
const ticker = new PIXI.Ticker();
ticker.add(gameLoop);
ticker.start();