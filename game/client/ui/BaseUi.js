
class BaseUi {
    constructor(state) {
        this.state = state;
        this.canvas_size = null;
        this.onInit();
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

    onResize() {
        // return bool (true to override click)
        throw new Error("Method 'onResize()' must be implemented.");
    }

    onUpdate(time_elapsed) {
        var { canvas_size } = this;

        if (canvas_size &&
            (canvas_size.width !== canvas.width || canvas_size.height !== canvas.height)) {
            // update canvas_size
            this.canvas_size = { width: canvas.width, height: canvas.height };
            this.onResize();
        }
        // set canvas_size if it's not set
        if (!canvas_size) {
            this.canvas_size = { width: canvas.width, height: canvas.height };
        }
    }
}