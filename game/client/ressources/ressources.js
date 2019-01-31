
var g_loaded_res_counter = 0;

var ressources = {
    // Fonts
    "TEXT_MEDIUM": new ResText("blue", "18px Arial"),
    // Images
    "BACKGROUND_EARTH": new ResImage("static_background_earth.jpg", Constants.X_VIEW_RANGE),
    "BACKGROUND_MARS": new ResImage("static_background_mars.jpg", Constants.X_VIEW_RANGE),
    "BACKGROUND_SPACE": new ResImage("static_background_space.png", Constants.X_VIEW_RANGE),
    "SPACESHIP_1": new ResImage("spaceship_1.png", 20),
    "SPACESHIP_2": new ResImage("spaceship_2.png", 10),
    "THRUSTER_1": new ResImage("thrust.png", 7),
    "STARGATE_OPEN": new ResImage("stargate_open.png", 30),
    "STARGATE_CLOSED": new ResImage("stargate_closed.png", 30),
    "TARGET_RED": new ResImage("target_red.png", 40),
    // Sounds
    "SOUND_THRUSTER_1": new ResAudio("thruster_1.mp3", true),
    "SOUND_HYPERWINDOW": new ResAudio("hyperwindow.wav"),
};

var g_res_count = Object.keys(ressources).length
