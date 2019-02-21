
class ResWorldImage {
    constructor(name, size_x) {
        this._image = new Image();
        this._image.onload = this.onLoad.bind(this);
        this._image.src = "../res/images/" + name;
        this._size_x = size_x;
        this._x_screen_ratio = this.getScreenRatio();
        this._image_ratio = null;
    }

    onLoad() {
        console.log("Loaded: " + this._image.src);
        g_loaded_res_counter += 1;
        this._image_ratio = this._image.height / this._image.width;
    }

    getScreenRatio() {
        return this._size_x / Constants.X_VIEW_RANGE;
    }

    size() {
        // get on screen size
        var screen_size_x = canvas.width * this._x_screen_ratio;
        return new Position(screen_size_x, screen_size_x * this._image_ratio);
    }

    renderArea() {
        // Area of the image rendered
        // returns {width, height}
        return {
            "width": this._image.width,
            "height": this._image.height
        }
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0,
        sx = 0, sy = 0) {
        var size = this.size();
        context.save();
        context.translate(x + size.x / 2, y + size.y / 2);
        context.rotate(rotation);

        context.drawImage(this._image,
            sx, sy,
            this.renderArea().width, this.renderArea().height,
            -size.x / 2 + x_offset, -size.y / 2 + y_offset, size.x, size.y);
        context.restore();
    }

    drawCenterAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        var size = this.size();
        this.drawAt(x - size.x / 2, y - size.y / 2, rotation,
            x_offset, y_offset);
    }
}


class ResUiImage extends ResWorldImage {
    // same as world image but the size of the image is defined by
    // percentage of the screen size
    getScreenRatio() {
        return this._size_x / 100;
    }
}