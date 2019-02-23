
class ResWorldImage {
    constructor(name, size_x) {
        this._image = new Image();
        this._image.onload = this.onLoad.bind(this);
        this._image.src = "/game/res/images/" + name;
        this._size_x = size_x;
        this._x_screen_ratio = this.getScreenRatio();
        this._image_ratio = null;
        this._render_area = null;
    }

    onLoad() {
        console.log("Loaded: " + this._image.src);
        g_loaded_res_counter += 1;
        this._render_area = this.getRenderArea();
        this._image_ratio = this._render_area.y / this._render_area.x;
    }

    getScreenRatio() {
        return this._size_x / Constants.X_VIEW_RANGE;
    }

    size() {
        // get on screen size
        var screen_size_x = canvas.width * this._x_screen_ratio;
        return new Position(screen_size_x, screen_size_x * this._image_ratio);
    }

    getRenderArea() {
        // Area of the image rendered
        return new Position(this._image.width, this._image.height);
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0,
        sx = 0, sy = 0) {
        var size = this.size();
        context.save();
        context.translate(x + size.x / 2, y + size.y / 2);
        context.rotate(rotation);

        /* // debug
        if (this._image.src.endsWith("explosion_1.png")) {
            console.log([
                this._image.src,
                sx, sy,
                this._render_area.x, this._render_area.y,
                -size.x / 2 + x_offset, -size.y / 2 + y_offset, size.x, size.y
            ]);
        }
        */
        context.drawImage(this._image,
            sx, sy,
            this._render_area.x, this._render_area.y,
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