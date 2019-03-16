class ResText {
    constructor(color, font) {
        this.color = color;
        this.font = font;
        g_loaded_res_counter += 1;
        context.font = this.font;
        this.height = context.measureText('M').width;
    }

    drawCenterAt(text, x, y) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.fillText(text, x, y);
    }

    drawAt(text, x, y) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "left";
        context.fillText(text, x, y + this.height);
    }
}