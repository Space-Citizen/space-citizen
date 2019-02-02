
var g_loaded_res_counter = 0;

var ressources = {
    // Fonts
    "TEXT_MEDIUM": new ResText("blue", "18px Arial"),
    // Images
    "BACKGROUND_EARTH": new ResUiImage("static_background_earth.jpg", 100),
    "BACKGROUND_MARS": new ResUiImage("static_background_mars.jpg", 100),
    "BACKGROUND_SPACE": new ResUiImage("static_background_space.png", 100),
    "SPACESHIP_1": new ResWorldImage("spaceship_1.png", 20),
    "SPACESHIP_2": new ResWorldImage("spaceship_2.png", 10),
    "THRUSTER_1": new ResWorldImage("thrust.png", 7),
    "STARGATE_OPEN": new ResWorldImage("stargate_open.png", 30),
    "STARGATE_CLOSED": new ResWorldImage("stargate_closed.png", 30),
    "TARGET_RED": new ResWorldImage("target_red.png", 40),
    "MISSILE_1": new ResWorldImage("missile_1.png", 10),
    // Sounds
    "SOUND_THRUSTER_1": new ResAudio("thruster_1.mp3", true),
    "SOUND_HYPERWINDOW": new ResAudio("hyperwindow.wav"),
};

var g_res_count = Object.keys(ressources).length
