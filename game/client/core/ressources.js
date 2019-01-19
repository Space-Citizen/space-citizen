
var g_loaded_res_counter = 0;

function __loadImage(src) {
    var img = new Image();
    img.onload = function() {
        g_loaded_res_counter += 1;
    };
    img.src = src;
    return img;
}

var ressources = {
    "BACKGROUND": __loadImage("../res/static_background.jpg"),
    "SPACESHIP_BODY":  __loadImage("../res/spaceship1.png"),
};

var g_res_count = Object.keys(ressources).length
