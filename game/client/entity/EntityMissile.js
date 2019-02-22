class EntityMissile extends BaseEntity {
    onInit() {
        this.image_body = ressources.MISSILE_1;
        this.explosion = ressources.EXPLOSION_1.clone();

        this.sound_fire = this.getAudio(ressources.SOUND_MISSILE_FIRE);
        this.sound_explosion = this.getAudio(ressources.SOUND_EXPLOSION_1);
        this.sound_fire.play();
    }

    getScreenPos() {
        return this.game.relPos(this.pos);
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.bearing = this.s_bearing;
        var screen_pos = this.getScreenPos();
        if (this.isAlive()) {
            // normal flow
            this.image_body.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
        } else {
            this.explosion.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
            if (this.explosion.isFinished()) {
                super.kill();
            }
        }
    }

    getHitCircle() {
        return 0;
    }

    getPriority() {
        return priority.MISSILE;
    }

    kill() {
        this.sound_explosion.play();
    }
}
