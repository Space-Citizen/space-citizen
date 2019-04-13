
class ResSprite extends ResWorldImage {
    constructor(name, size_x, frame_count_x, frame_count_y = null) {
        super(name, size_x);
        if (frame_count_y != null) {
            this._frame_count = new Position(frame_count_x, frame_count_y);
        } else {
            this._frame_count = new Position(frame_count_x, frame_count_x);
        }
        this._total_frames = this._frame_count.x * this._frame_count.y;
        this._frame_size = null;
        this._frame_interval = 1 / 30;
    }

    onLoad() {
        this._frame_size = new Position(
            this._image.width / this._frame_count.x,
            this._image.height / this._frame_count.y
        );
        if (!Helper.isInt(this._frame_size.x) || !Helper.isInt(this._frame_size.y)) {
            throw "sprite images must be divisible by the number of frames";
        }
        super.onLoad();
        this.reset();
    }

    reset(loop) {
        this._loop = loop;
        this._frame = 0;
        this._finished = false;
    }

    getRenderArea() {
        return new Position(this._frame_size.x, this._frame_size.y);
    }

    getSpritePos() {
        var nframe_x = (this._frame % this._frame_count.x);
        var nframe_y = Math.floor(this._frame / this._frame_count.x);
        return new Position(
            this._frame_size.x * nframe_x,
            this._frame_size.y * nframe_y
        );
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        if (this._finished) {
            return;
        }
        if (Helper.onInterval(this, "frameInterval", this._frame_interval)) {
            if (this._loop) {
                this._frame = (this._frame + 1) % this._total_frames;
            } else {
                this._frame += 1;
                if (this._frame > this._total_frames) {
                    this._finished = true;
                    return;
                }
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
