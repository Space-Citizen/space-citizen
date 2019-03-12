
class TextInput {
    constructor() {
        this.id = "text_input";

        this.time_last_update = Date.now();
        //canvas.outerHTML += '<input type="text" id="text_input" style="position:absolute;left:100px;top:300px;width:600px;"/>';
        this.element = document.getElementById(this.id);
        this.element.style.position = "absolute";

    }

    update(x, y, size_x, size_y) {
        console.log("hue");
        var time_elasped = this.time_last_update - Date.now();
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    }
}