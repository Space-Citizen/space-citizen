
class Daedalus extends BaseShip {
    constructor() {
        super();
        this.image_body = ressources.SPACESHIP_4;
        this.image_thruster_left = ressources.THRUSTER_2.clone(true);
        this.image_thruster_right = ressources.THRUSTER_2.clone(true);
    }

    getBodySize() {
        return this.image_body.size().x;
    }

    drawShipBody(pos, bearing, draw_thrusters) {
        if (draw_thrusters) {
            this.image_thruster_left.drawCenterAt(pos.x, pos.y, bearing,
                -this.image_body.size().x / 1.9, this.image_body.size().y / 4);
            this.image_thruster_right.drawCenterAt(pos.x, pos.y, bearing,
                -this.image_body.size().x / 1.9, -this.image_body.size().y / 4);
        }
        // draw body
        this.image_body.drawCenterAt(pos.x, pos.y, bearing);
    }
}