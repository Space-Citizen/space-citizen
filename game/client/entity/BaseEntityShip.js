class BaseEntityShip extends BaseEntity {
    onInit() {
        this.image_body = ressources.SPACESHIP_4;
        this.image_thruster = ressources.THRUSTER_2.clone(true);
        this.explosion = ressources.EXPLOSION_2.clone();
        this.sound_explosion = this.getAudio(ressources.SOUND_EXPLOSION_1);
    }

    getScreenPos() {
        return this.game.relPos(this.pos);
    }

    drawHealthBar(x, y, size) {
        var x_size = convertSizeToScreen(size);
        var y_size = x_size / 30;

        var x = x - x_size / 2;
        var y = y - y_size / 2;

        context.beginPath();
        context.fillStyle = "grey"
        context.fillRect(x, y, x_size, y_size);
        context.stroke();

        context.beginPath();
        context.fillStyle = "green"
        context.fillRect(x, y, x_size * this.s_hp / 100, y_size);
        context.stroke();
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.bearing = this.s_bearing;
        var screen_pos = this.getScreenPos();

        if (this.isAlive()) {
            if (this.s_target) {
                // draw thrusters
                this.image_thruster.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing,
                    -this.image_body.size().x / 1.5, 0);
            }
            // draw body
            this.image_body.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
            // draw name
            ressources.TEXT_MEDIUM.drawCenterAt(
                this.c_name,
                screen_pos.x,
                screen_pos.y + this.image_body.size().x
            );
            this.drawHealthBar(screen_pos.x, screen_pos.y - + this.image_body.size().y, 30);
        } else {
            this.explosion.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
            if (this.explosion.isFinished()) {
                super.kill();
            }
        }
    }

    getHitCircle() {
        return 20;
    }

    getPriority() {
        return priority.SHIPS;
    }

    kill() {
        this.sound_explosion.play();
    }
}
