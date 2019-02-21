
class ResSprite extends ResWorldImage {
    constructor(name, size_x, frame_count_x, frame_count_y = null) {
        super(name, size_x);
        this._frame_count_x = frame_count_x;
        this._frame_count_y = frame_count_y;
        if (this._frame_count_y == null) {
            this._frame_count_y = frame_count_x;
        }
        this._frame_size_x = this._image.width / this._frame_count_x;
        this._frame_size_y = this._image.height / this._frame_count_y;
        this._total_frames = this._frame_count_x * this._frame_count_y;
        this.reset(false);
    }

    reset(loop) {
        this._loop = loop;
        this._frame = 0;
        this._finished = false;
    }

    renderArea() {
        return {
            "width": this._frame_size_x,
            "height": this._frame_size_y
        }
    }

    getSpritePos() {
        var nframe_x = (this._frame % this._frame_count_x);
        var nframe_y = Math.floor(this._frame / this._frame_count_x);
        return new Position(
            this._frame_size_x * nframe_x,
            this._frame_size_y * nframe_y
        );
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        if (this._finished) {
            return;
        }
        if (this._loop) {
            this._frame = (this._frame + 1) % this._total_frames;
        } else {
            this._frame += 1;
            if (this._frame > this._total_frames) {
                this._finished = true;
                return;
            }
        }

        super.drawAt(x, y, rotation, x_offset, y_offset,
            this.getSpritePos().x, this.getSpritePos().y);
    }

    isFinished() {
        return this._finished;
    }

    clone(loop = false) {
        var clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        clone.reset(loop);
        return clone;
    }
}
