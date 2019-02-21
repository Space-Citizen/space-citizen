
class ResSprite extends ResWorldImage {
    constructor(name, size_x, sprite_size_x, sprite_size_y = null) {
        super(name, size_x);
        this._sprite_size_x = sprite_size_x
        this._sprite_size_y = sprite_size_y
        if (this._sprite_size_y == null) {
            this._sprite_size_y = this._sprite_size_x;
        }
        this._frame = 0;
        this._frames_x = this._image.width / this._sprite_size_x;
        this._frames_y = this._image.height / this._sprite_size_y;
        this._total_frames = this._frames_x * this._frames_y;
        console.log("total: " + this._total_frames);
    }

    renderArea() {
        return {
            "width": this._sprite_size_x,
            "height": this._sprite_size_x
        }
    }

    getSpritePos() {
        var nframe_x = (this._frame % this._frames_x);
        var nframe_y = Math.floor(this._frame / this._frames_x);
        console.log(nframe_y);
        return new Position(
            this._sprite_size_x * nframe_x,
            this._sprite_size_y * nframe_y
        );
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        this._frame = (this._frame + 1) % this._total_frames;
        super.drawAt(x, y, rotation, x_offset, y_offset,
            this.getSpritePos().x, this.getSpritePos().y);
    }
}
