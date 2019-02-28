
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

    onUpdate(time_elapsed) {
        throw new Error("Method 'onUpdate()' must be implemented.");
    }
}