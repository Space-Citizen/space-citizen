class EntityPlayer extends BaseEntityShip {
    onInit() {
        super.onInit();
    }

    getScreenPos() {
        // this is to prevent jerky movement of the user ship
        // relative to the center of the screen
        if (this.id === this.game.self.id) {
            return this.game.relPos(this.game.pos);
        }
        return super.getScreenPos();
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
    }
}
