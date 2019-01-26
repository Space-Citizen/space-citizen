
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
    constructor(src, size_x) {
        this._image = __loadImage(src);
        this._ratio = size_x / Constants.X_VIEW_RANGE;
    }
    size() {
        // get on screen size
        var imageRatio = this._image.height / this._image.width;
        var sizeX = canvas.width * this._ratio;
        return new Position(sizeX, sizeX * imageRatio);
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
    "BACKGROUND_EARTH": new ResImage("../res/static_background_earth.jpg", Constants.X_VIEW_RANGE),
    "BACKGROUND_MARS": new ResImage("../res/static_background_mars.jpg", Constants.X_VIEW_RANGE),
    "BACKGROUND_SPACE": new ResImage("../res/static_background_space.png", Constants.X_VIEW_RANGE),
    "SPACESHIP_BODY": new ResImage("../res/spaceship1.png", 30),
    "THRUSTER_1": new ResImage("../res/thrust.png", 10),
    "STARGATE_OPEN": new ResImage("../res/stargate_open.png", 30),
    "STARGATE_CLOSED": new ResImage("../res/stargate_closed.png", 30),
    "TARGET_BLUE": new ResImage("../res/target_blue.png", 35),
    "TARGET_RED": new ResImage("../res/target_red.png", 35),
};

var g_res_count = Object.keys(ressources).length
