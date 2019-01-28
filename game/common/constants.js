
var port = 12345;

var Constants = {
  "FRAMERATE": 30,
  "SERVER": ':' + port, // used by client (io.connect)
  "WORLD_SIZE": 10000,
  "PORT": port,
  "SCREEN_RATIO": 16 / 9,
  "X_VIEW_RANGE": 300, // value in meters. Y view range is defined by screen ratio
}
Object.freeze(Constants);

if (typeof module != 'undefined') {
  module.exports = Constants;
}
