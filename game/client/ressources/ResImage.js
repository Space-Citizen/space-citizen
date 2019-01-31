
function __loadImage(src) {
    var img = new Image();
    img.onload = function () {
        g_loaded_res_counter += 1;
    };
    img.src = src;
    return img;
}

class ResImage {
    constructor(name, size_x) {
        this._image = __loadImage("../res/images/" + name);
        this._ratio = size_x / Constants.X_VIEW_RANGE;
    }
    size() {
        // get on screen size
        var imageRatio = this._image.height / this._image.width;
        var size_x = canvas.width * this._ratio;
        return new Position(size_x, size_x * imageRatio);
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        var size = this.size();
        context.save();
        context.translate(x + size.x / 2, y + size.y / 2);
        context.rotate(rotation);

        context.drawImage(this._image, 0, 0,
            this._image.width, this._image.height,
            -size.x / 2 + x_offset, -size.y / 2 + y_offset, size.x, size.y);
        context.restore();
    }

    drawCenterAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        var size = this.size();
        this.drawAt(x - size.x / 2, y - size.y / 2, rotation,
            x_offset, y_offset);
    }
}
