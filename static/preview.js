class Preview {
    constructor(color) {
        this.color = color;
        this.graphics = new PIXI.Graphics();
        this.graphics.visible = false;
        board_container.addChild(this.graphics);
    }


    draw(delta) {

        this.graphics.clear();

        this.graphics.lineStyle(18, this.color);
        let tip = delta.multiply((board_width - margin) / 6);
        this.graphics.moveTo(0, 0).lineTo(tip.x, tip.y);

        let normal = delta.get_normal().normalize().multiply(30);
        let arrow_length = delta.normalize().multiply(30);
        let path = [tip.x - arrow_length.x + normal.x, tip.y - arrow_length.y + normal.y, tip.x - arrow_length.x - normal.x, tip.y - arrow_length.y - normal.y, tip.x + arrow_length.x, tip.y + arrow_length.y];
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color);
        this.graphics.drawPolygon(path);
        this.graphics.endFill();
    }
}