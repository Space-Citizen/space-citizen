class EntityMissile extends BaseEntity {
    onInit() {
        this.image_body = ressources.MISSILE_1;
    }

    getScreenPos() {
        return this.game.relPos(this.pos);
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.bearing = this.s_bearing;
        var screen_pos = this.getScreenPos();
        // draw body
        this.image_body.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
    }

    getHitCircle() {
        return 0;
    }

    getPriority() {
        return priority.MISSILE;
    }
}
