
if (typeof module != 'undefined') {
  var Constants = require('./Constants');
  var GameLoop = require('./GameLoop');
  var Position = require('./Position');
  var Events = require('./Events');

  module.exports = {
    Position,
    GameLoop,
    Events,
    Constants
  };
}
