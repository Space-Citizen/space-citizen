
class IState {

    init(manager) {
        this.manager = manager;
        this.onInit();
    }
    
    onInit() {
        throw new Error("Method 'onInit()' must be implemented.");
    }

    onUpdate(timeElapsed) {
        throw new Error("Method 'onUpdate(timeElapsed)' must be implemented.");
    }

    onDestroy() {
        throw new Error("Method 'onDestroy()' must be implemented.");
    }

}