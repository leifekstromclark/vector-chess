class Card {
    constructor(delta) {
        this.delta = delta;

        this.graphics = new PIXI.Graphics();

        //background
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawRoundedRect(-55, -75, 110, 150, 20);
        this.graphics.endFill();

        //grid
        for (let i = -3; i < 4; i++) {
            if (i == 0) {
                this.graphics.lineStyle(2, 0x000000);
            }
            else {
                this.graphics.lineStyle(1, 0x000000, 0.4);
            }
            this.graphics.moveTo(-45, -20 + i * 15).lineTo(45, -20 + i * 15);
            this.graphics.moveTo(i * 15, -65).lineTo(i * 15, 25); 
        }

        //graphed vector
        this.graphics.lineStyle(3, 0x0000FF);
        let graph_vect = new Vector(delta.x, delta.y * -1);
        let tip = graph_vect.multiply(15).add(new Vector(0, -20));
        this.graphics.moveTo(0, -20).lineTo(tip.x, tip.y);

        
        // draw polygon
        let normal = graph_vect.get_normal().normalize().multiply(5);
        let arrow_length = graph_vect.normalize().multiply(5);
        let path = [tip.x - arrow_length.x + normal.x, tip.y - arrow_length.y + normal.y, tip.x - arrow_length.x - normal.x, tip.y - arrow_length.y - normal.y, tip.x + arrow_length.x, tip.y + arrow_length.y];
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0x0000FF);
        this.graphics.drawPolygon(path);
        this.graphics.endFill();


        stage.addChild(this.graphics);
    }
}