
class BC304 extends BaseShip {
    constructor() {
        super();
        this.image_body = ressources.SPACESHIP_4;
        this.image_thruster = ressources.THRUSTER_2.clone(true);
    }

    getNameOffset() {
        return new Position(0, this.image_body.size().y * 1.2);
    }

    getHpOffset() {
        return new Position(0, -this.image_body.size().y * 1.2);
    }

    getHitCircle() {
        return 20;
    }

    drawShipBody(pos, bearing, draw_thrusters) {
        if (draw_thrusters) {
            this.image_thruster.drawCenterAt(pos.x, pos.y, bearing,
                -this.image_body.size().x / 1.5, 0);
        }
        // draw body
        this.image_body.drawCenterAt(pos.x, pos.y, bearing);
    }
}