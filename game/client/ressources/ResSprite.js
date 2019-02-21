
class ResSprite extends ResWorldImage {
    constructor(name, size_x, sprite_size_x, sprite_size_y = null) {
        super(name, size_x);
        this._sprite_size_x = sprite_size_x
        this._sprite_size_y = sprite_size_y
        if (this._sprite_size_y == null) {
            this._sprite_size_y = this._sprite_size_x;
        }
        this._frame = 0;
    }

    renderArea() {
        return {
            "width": this._sprite_size_x,
            "height": this._sprite_size_x
        }
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        super.drawAt(x, y, rotation, x_offset, y_offset, 0, 0);
    }
}
