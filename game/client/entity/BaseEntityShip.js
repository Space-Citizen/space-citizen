class BaseEntityShip extends BaseEntity {
    onInit() {
        this.image_body = ressources.SPACESHIP_2;
        this.image_thruster = ressources.THRUSTER_1;
    }

    getScreenPos() {
        return this.manager.relPos(this.pos);
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
        context.fillRect(x, y, x_size, y_size * this.s_hp / 100);
        context.stroke();
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        var screen_pos = this.getScreenPos();
        //context.stroke();
        if (this.s_target) {
            // draw thrusters
            this.image_thruster.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing,
                -this.image_body.size().x / 1.8, 0);
        }
        // draw body
        this.image_body.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
        // draw name
        ressources.TEXT_MEDIUM.drawCenterAt(
            this.s_name,
            screen_pos.x,
            screen_pos.y + this.image_body.size().x
        );
        this.drawHealthBar(screen_pos.x, screen_pos.y - + this.image_body.size().y, 30);
    }

    onDestroy() {

    }

    getHitCircle() {
        return 20;
    }

    getPriority() {
        return priority.SHIPS;
    }
}
