class BaseEntityShip extends BaseEntity {
    onInit() {
        this.ship = createShip(this.c_ship_type);
        this.hit_circle = this.ship.getBodySize() / 2;
        this.sprite_explosion = ressources.EXPLOSION_2.clone();
        this.sound_explosion = this.getAudio(ressources.SOUND_EXPLOSION_1);
    }

    getScreenPos() {
        return this.game.relPos(this.pos);
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.bearing = this.s_bearing;
        var screen_pos = this.getScreenPos();

        if (this.isAlive()) {
            var show_thrusters = this.s_target ? true : false;
            this.ship.draw(screen_pos, this.c_name, this.s_hp, this.bearing, show_thrusters);

        } else {
            this.sprite_explosion.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
            if (this.sprite_explosion.isFinished()) {
                super.kill();
            }
        }
    }

    getHitCircle() {
        return this.hit_circle;
    }

    getPriority() {
        return priority.SHIPS;
    }

    kill() {
        this.sound_explosion.play();
    }
}
