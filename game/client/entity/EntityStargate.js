class EntityStargate extends BaseEntity {
    onInit() {
        this.image = ressources.STARGATE;
    }

    onUpdate(timeElapsed) {
        super.onUpdate(timeElapsed);
        var screen_pos = this.manager.relPos(this.pos);
        //context.stroke();
        this.image.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
    }

    onDestroy() {

    }
}
