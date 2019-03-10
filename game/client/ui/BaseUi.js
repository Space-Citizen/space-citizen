
class BaseUi {
    constructor(state) {
        this.state = state;
        this.canvas_size = null;
        this.onInit();
        this.calcScreenPos();
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize() {
        this.calcScreenPos();
    }

    onInit() {
        throw new Error("Method 'onInit()' must be implemented.");
    }

    onMouseLeftClick() {
        // return bool (true to override click)
        throw new Error("Method 'onMouseLeftClick()' must be implemented.");
    }

    onMouseRightClick() {
        // return bool (true to override click)
        throw new Error("Method 'onMouseRightClick()' must be implemented.");
    }

    onUpdate(time_elapsed) {
        throw new Error("Method 'onUpdate()' must be implemented.");
    }

    getPercentPos() {
        // Position in screen percent
        throw new Error("Method 'getPercentPos()' must be implemented.");
    }

    getPercentSize() {
        // Size in screen percent
        throw new Error("Method 'getPercentSize()' must be implemented.");
    }

    calcScreenPos() {
        var p_size = this.getPercentSize();
        var p_pos = this.getPercentPos();
        this.size = new Position(
            percentWidthToScreen(p_size.x),
            percentHeightToScreen(p_size.y),
        );
        this.pos_top_left = new Position(
            percentWidthToScreen(p_pos.x),
            percentHeightToScreen(p_pos.y),
        );
        this.pos_bottom_right = {
            x: this.pos_top_left.x + this.size.x,
            y: this.pos_top_left.y + this.size.y
        };
    }

    relMousePos() {
        // mouse pos relative to pos_top_left
        return new Position(
            mouse.x - this.pos_top_left.x,
            mouse.y - this.pos_top_left.y
        );
    }

    isMouseInsideUi() {
        if (mouse.x >= this.pos_top_left.x && mouse.y >= this.pos_top_left.y
            && mouse.x <= this.pos_bottom_right.x && mouse.y <= this.pos_bottom_right.y) {
            return true;
        }
        return false;
    }
}