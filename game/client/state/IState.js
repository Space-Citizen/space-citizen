
class IState {

    init(manager) {
        this.manager = manager;
        this.onInit();
    }

    onInit() {
        throw new Error("Method 'onInit()' must be implemented.");
    }

    onUpdate(time_elapsed) {
        throw new Error("Method 'onUpdate(time_elapsed)' must be implemented.");
    }

    onDestroy() {
        throw new Error("Method 'onDestroy()' must be implemented.");
    }

}