

var g_loaded_res_counter = 0;

function __loadImage(src) {
    var img = new Image();
    img.onload = function () {
        g_loaded_res_counter += 1;
    };
    img.src = src;
    return img;
}

class ResImage {
    constructor(src, ratio) {
        this._image = __loadImage(src);
        this._ratio = ratio / 100.0;
    }
    size() {
        var imageRatio = this._image.width / this._image.height;
        var sizeY = canvas.height * this._ratio;
        return new Position(sizeY * imageRatio, sizeY);
    }

    drawAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        var size = this.size();
        context.save();
        context.translate(x + size.x / 2, y + size.y / 2);
        context.rotate(rotation);

        context.drawImage(this._image, 0, 0,
            this._image.width, this._image.height,
            -size.x / 2 + x_offset, -size.y / 2 + y_offset, size.x, size.y);
        context.restore();
    }

    drawCenterAt(x, y, rotation = 0, x_offset = 0, y_offset = 0) {
        var size = this.size();
        this.drawAt(x - size.x / 2, y - size.y / 2, rotation,
            x_offset, y_offset);
    }
}

class ResText {
    constructor(color, font) {
        this.color = color;
        this.font = font;
        g_loaded_res_counter += 1;
    }

    drawCenterAt(text, x, y) {
        // save context?
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.fillText(text, x, y);
    }
}

var ressources = {
    "TEXT_MEDIUM": new ResText("blue", "18px Arial"),
    "BACKGROUND": new ResImage("../res/static_background_2.png", 100),
    "SPACESHIP_BODY": new ResImage("../res/spaceship1.png", 20),
    "THRUSTER_1": new ResImage("../res/thrust.png", 5),
    "STARGATE": new ResImage("../res/stargate.png", 30),
};

var g_res_count = Object.keys(ressources).length
