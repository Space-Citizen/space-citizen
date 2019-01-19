
var Constants = {
  "FRAMERATE": 30,
  "SERVER": 'http://192.168.1.25:12345',
  "WORLD_SIZE": 10000,
  "PORT": 12345
}
Object.freeze(Constants);

if (typeof module != 'undefined') {
  module.exports = Constants;
}
