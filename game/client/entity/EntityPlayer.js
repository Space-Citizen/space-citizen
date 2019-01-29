class EntityPlayer extends BaseEntityShip {
    onInit() {
        super.onInit();
    }

    getScreenPos() {
        // this is to prevent jerky movement of the user ship
        // relative to the center of the screen
        if (this.id === this.manager.self.id) {
            return this.manager.relPos(this.manager.pos);
        }
        return super.getScreenPos();
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
    }

    onDestroy() {

    }
}
