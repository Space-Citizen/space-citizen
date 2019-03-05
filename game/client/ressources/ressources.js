
var g_loaded_res_counter = 0;

var ressources = {
    // Fonts
    TEXT_MEDIUM: new ResText("blue", "18px Arial"),
    // Images
    BACKGROUND_EARTH: new ResWorldImage("static_background_earth.jpg", Constants.WORLD_SIZE_X),
    BACKGROUND_MARS: new ResWorldImage("static_background_mars.jpg", Constants.WORLD_SIZE_X),
    BACKGROUND_SPACE: new ResWorldImage("static_background_space.png", Constants.WORLD_SIZE_X),
    // Minimap
    MINIMAP_BACKGROUND_EARTH: new ResUiImage("static_background_earth.jpg", 20),
    MINIMAP_STARGATE: new ResUiImage("stargate_closed.png", 1),
    MINIMAP_PLAYER: new ResUiImage("minimap_player.jpg", 0.3),
    MINIMAP_HOSTILE: new ResUiImage("minimap_hostile.jpg", 0.3),
    MINIMAP_ALLY: new ResUiImage("minimap_ally.jpg", 0.3),

    NO_SIGNAL: new ResUiImage("no_signal.jpg", 100),
    FIGHTER_1: new ResWorldImage("fighter_1.png", 5),
    FIGHTER_2: new ResWorldImage("fighter_2.png", 5),
    SPACESHIP_3: new ResWorldImage("spaceship_3.png", 25),
    SPACESHIP_4: new ResWorldImage("spaceship_4.png", 25),
    SPACESHIP_5: new ResWorldImage("spaceship_5.png", 25),
    SPACESHIP_6: new ResWorldImage("spaceship_6.png", 35),
    THRUSTER_1: new ResWorldImage("thrust_1.png", 7),
    THRUSTER_3: new ResWorldImage("thrust_3.png", 2),
    STARGATE_OPEN: new ResWorldImage("stargate_open.png", 30),
    STARGATE_CLOSED: new ResWorldImage("stargate_closed.png", 30),
    TARGET_RED: new ResWorldImage("target_red.png", 40),
    MISSILE_1: new ResWorldImage("missile_1.png", 6),
    // Sprites
    // WARNING: sprite images must be divisible by the number of frames
    EXPLOSION_1: new ResSprite("explosion_1.png", 20, 4),
    EXPLOSION_2: new ResSprite("explosion_2.png", 40, 4),
    THRUSTER_2: new ResSprite("thrust_2.png", 6, 1, 7),

    // Sounds
    SOUND_THRUSTER_1: new ResAudio("thruster_1.mp3", true),
    SOUND_HYPERWINDOW: new ResAudio("hyperwindow.wav"),
    SOUND_MISSILE_FIRE: new ResAudio("missile_fire_1.wav"),
    SOUND_EXPLOSION_1: new ResAudio("explosion_1.wav"),
};

var g_res_count = Object.keys(ressources).length
