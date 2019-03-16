
class BaseShip {
    constructor() {

    }

    getBodySize() {
        throw new Error("Method 'getBodySize()' must be implemented.");
    }

    drawShipBody(pos, bearing, show_thrusters) {
        throw new Error("Method 'drawShipBody()' must be implemented.");
    }

    getNameOffset() {
        return new Position(0, this.getBodySize());
    }

    getHpOffset() {
        return new Position(0, -this.getBodySize());
    }

    drawName(pos, name) {
        var info_offset = this.getNameOffset();
        ressources.TEXT_SHIP_NAME.drawCenterAt(
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

    onUpdate(time_elapsed) {
        // can be overriden
    }
}
