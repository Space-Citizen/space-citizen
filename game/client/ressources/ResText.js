class ResText {
    constructor(color, font) {
        this.color = color;
        this.font = font;
        g_loaded_res_counter += 1;
    }

    drawCenterAt(text, x, y) {
        // save context?
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.fillText(text, x, y);
    }
}