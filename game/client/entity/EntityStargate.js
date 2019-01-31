class EntityStargate extends BaseEntity {
    onInit() {
        this.image_closed = ressources.STARGATE_CLOSED;
        this.image_open = ressources.STARGATE_OPEN;
        this.bearing = 0;
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        var screen_pos = this.game.relPos(this.pos);
        //context.stroke();
        var image = this.image_closed;
        if (this.s_stargate_open) {
            image = this.image_open;
            this.bearing += 0.5 * time_elapsed;
        }
        image.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
    }

    getHitCircle() {
        return 0;
    }

    getPriority() {
        return priority.STARGATE;
    }
}
