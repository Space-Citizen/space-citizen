class Position {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
if (typeof module != 'undefined') {
    module.exports = Position;
}
