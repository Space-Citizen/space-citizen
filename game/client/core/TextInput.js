
class TextInput {
    constructor(
        x, y,
        size_x, size_y
    ) {
        this.pos = {
            x: x,
            y: y
        };
        this.size = {
            x: size_x,
            y: size_y
        };
        this.time_last_update = Date.now();
    }

    update() {
        var time_elasped = this.time_last_update - Date.now();
    }
}