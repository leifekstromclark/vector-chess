class Card {
    constructor(delta, deck, pos) {
        this.delta = delta;
        this.graphics = new PIXI.Graphics();
        this.update_position(deck, pos);
        this.generate_graphics();
        stage.addChild(this.graphics);
        this.graphics.card = this;
        this.graphics.interactive = true;
        this.graphics.buttonmode = true;
    }

    generate_graphics() {
        let color = vector_colors[this.pos];

        //background
        this.graphics.lineStyle(6, 0x000000);
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawRoundedRect(-110, -150, 220, 300, 40);
        this.graphics.endFill();

        //grid
        for (let i = -3; i < 4; i++) {
            if (i == 0) {
                this.graphics.lineStyle(4, 0x000000);
            }
            else {
                this.graphics.lineStyle(2, 0x000000, 0.4);
            }
            this.graphics.moveTo(-90, -40 + i * 30).lineTo(90, -40 + i * 30);
            this.graphics.moveTo(i * 30, -130).lineTo(i * 30, 50); 
        }

        //graphed vector
        this.graphics.lineStyle(6, color);
        let graph_vect = new Vector(this.delta.x, this.delta.y * -1);
        let tip = graph_vect.multiply(30).add(new Vector(0, -40));
        this.graphics.moveTo(0, -40).lineTo(tip.x, tip.y);

        let normal = graph_vect.get_normal().normalize().multiply(10);
        let arrow_length = graph_vect.normalize().multiply(10);
        let path = [tip.x - arrow_length.x + normal.x, tip.y - arrow_length.y + normal.y, tip.x - arrow_length.x - normal.x, tip.y - arrow_length.y - normal.y, tip.x + arrow_length.x, tip.y + arrow_length.y];
        this.graphics.lineStyle(0);
        this.graphics.beginFill(color);
        this.graphics.drawPolygon(path);
        this.graphics.endFill();
        
        //vector numbers
        let style = new PIXI.TextStyle({fontSize: 40});
        let text = new PIXI.Text(String(this.delta.x), style);
        text.position.set(-text.width / 2, 54);
        this.graphics.addChild(text);
        text = new PIXI.Text(String(this.delta.y), style);
        text.position.set(-text.width / 2, 95);
        this.graphics.addChild(text);

        this.graphics.lineStyle(4, 0x000000);
        this.graphics.moveTo(-20, 135).lineTo(-30, 135).lineTo(-30, 60).lineTo(-20, 60);
        this.graphics.moveTo(20, 135).lineTo(30, 135).lineTo(30, 60).lineTo(20, 60);
    }

    update_position(deck, pos) {
        this.deck = deck;
        this.pos = pos;
        let pos_list;
        if (this.deck == 0) {
            pos_list = card_positions;
        } else if (this.deck == 1) {
            pos_list = opp_card_positions;
        } else {
            pos_list = next_card_positions;
        }
        this.graphics.position.set(pos_list[this.pos].x, pos_list[this.pos].y);
    }
}