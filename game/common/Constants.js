
var __PORT = 12345;
var __WORLD_SIZE = 500;
var __SCREEN_RATIO = (16 / 9);

var Constants = {
  FRAMERATE: 30,
  SERVER: ':' + __PORT, // used by client (io.connect)
  WORLD_SIZE_X: __WORLD_SIZE * __SCREEN_RATIO,
  WORLD_SIZE_Y: __WORLD_SIZE, // If you want to edit this value world size and background size are related
  PORT: __PORT,
  SCREEN_RATIO: __SCREEN_RATIO,
  X_VIEW_RANGE: 300, // value in meters. Y view range is defined by screen ratio
  SOUND_RANGE: 300,
  HEALTH_BAR_SIZE: 30 // value in meters
}
Object.freeze(Constants);

if (typeof module != 'undefined') {
  module.exports = Constants;
}
