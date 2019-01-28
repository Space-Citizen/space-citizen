
class BaseUi {
    constructor(game) {
        this.game = game;
        this.onInit();
    }

    onInit() {
        throw new Error("Method 'onInit()' must be implemented.");
    }

    onUpdate(timeElapsed) {
        throw new Error("Method 'onUpdate()' must be implemented.");
    }
}