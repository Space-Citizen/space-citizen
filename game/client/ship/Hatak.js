
class Hatak extends BaseShip {
    constructor() {
        super();
        this.bearing = 0;
        this.image_body = ressources.SPACESHIP_6;
    }

    getBodySize() {
        return this.image_body.size().x;
    }

    drawShipBody(pos, bearing, draw_thrusters) {
        this.image_body.drawCenterAt(pos.x, pos.y, this.bearing);
    }

    onUpdate(time_elapsed) {
        this.bearing += 0.2 * time_elapsed; // visual body rotation
    }
}
