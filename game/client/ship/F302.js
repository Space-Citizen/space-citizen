
class F302 extends BaseShip {
    constructor() {
        super();
        this.image_body = ressources.FIGHTER_1;
        this.image_thruster = ressources.THRUSTER_2.clone(true);
    }

    getBodySize() {
        return this.image_body.size().x;
    }

    drawShipBody(pos, bearing, draw_thrusters) {
        if (draw_thrusters) {
            this.image_thruster.drawCenterAt(pos.x, pos.y, bearing,
                -this.image_body.size().x, 0);
        }
        // draw body
        this.image_body.drawCenterAt(pos.x, pos.y, bearing);
    }
}