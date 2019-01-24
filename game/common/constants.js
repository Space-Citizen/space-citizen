
var Constants = {
  "FRAMERATE": 30,
  "SERVER": 'http://192.168.1.25:12345',
  "WORLD_SIZE": 10000,
  "PORT": 12345,
  "SCREEN_RATIO": 16 / 9,
  "X_VIEW_RANGE": 300, // value in meters. Y view range is defined by screen ratio
}
Object.freeze(Constants);

if (typeof module != 'undefined') {
  module.exports = Constants;
}
