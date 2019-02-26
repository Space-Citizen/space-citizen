
class BaseShip {
    constructor() {

    }

    getNameOffset() {
        throw new Error("Method 'getNameOffset()' must be implemented.");
    }

    getHpOffset() {
        throw new Error("Method 'getHpOffset()' must be implemented.");
    }

    getHitCircle() {
        throw new Error("Method 'getHitCircle()' must be implemented.");
    }

    drawShipBody(pos, bearing, show_thrusters) {
        throw new Error("Method 'drawShipBody()' must be implemented.");
    }

    drawName(pos, name) {
        var info_offset = this.getNameOffset();
        ressources.TEXT_MEDIUM.drawCenterAt(
            name,
            pos.x + info_offset.x,
            pos.y + info_offset.y
        );
    }

    drawHp(pos, hp_percent) {
        var hp_offset = this.getHpOffset();
        drawHealthBar(
            pos.x + hp_offset.x,
            pos.y + hp_offset.y, 30,
            hp_percent
        );
    }

    draw(pos, name, hp_percent, bearing, show_thrusters) {
        this.drawShipBody(pos, bearing, show_thrusters);
        this.drawHp(pos, hp_percent);
        this.drawName(pos, name);
    }
}
