class Unit {
    constructor(board_pos, allegiance, king) {
        this.board_pos = board_pos;
        this.allegiance = allegiance;
        this.king = king;
        this.graphics = new PIXI.Graphics();
        this.generate_graphics();
        this.graphics.position.set(margin / 2 + (board_width - margin) / 6 * board_pos.x, margin / 2 + (board_width - margin) / 6 * board_pos.y);
        board_container.addChild(this.graphics);
        this.graphics.unit = this;
        this.graphics.interactive = true;
        this.graphics.buttonmode = true;
    }

    generate_graphics() {
        this.graphics.lineStyle(0);
        let color;
        if (this.allegiance) {
            color = friendly_color;
        }
        else {
            color = enemy_color;
        }
        this.graphics.beginFill(color);
        this.graphics.drawCircle(0, 0, 40);
        this.graphics.endFill();
        if (this.king) {
            let king = new PIXI.Sprite.from('static/king.png')
            king.anchor.set(0.5, 0.5);
            king.alpha = 0.4;
            this.graphics.addChild(king);
        }
    }
}