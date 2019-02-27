
class ONeill extends BaseShip {
    constructor() {
        super();
        this.image_body = ressources.SPACESHIP_3;
        this.image_thruster = ressources.THRUSTER_3;
    }

    getBodySize() {
        return this.image_body.size().x;
    }

    drawShipBody(pos, bearing, draw_thrusters) {
        if (draw_thrusters) {
            this.image_thruster.drawCenterAt(pos.x, pos.y, bearing,
                -this.image_body.size().x / 1.9, 0);
        }
        // draw body
        this.image_body.drawCenterAt(pos.x, pos.y, bearing);
    }
}
