class BaseEntityShip extends BaseEntity {
    onInit() {
        this.image_body = ressources.SPACESHIP_BODY;
        this.image_thruster = ressources.THRUSTER_1;
    }

    onUpdate(timeElapsed) {
        super.onUpdate(timeElapsed);
        var screen_pos = this.manager.relPos(this.pos);
        //context.stroke();
        if (this.s_target) {
            this.image_thruster.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing,
                -this.image_body.size().x / 1.8, 0);
        }
        this.image_body.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
        ressources.TEXT_MEDIUM.drawCenterAt(
            this.id,
            screen_pos.x,
            screen_pos.y + this.image_body.size().y / 2
        );
    }

    onDestroy() {

    }

    hitCircle() {
        return 20;
    }
}
