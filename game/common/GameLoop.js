
class GameLoop {
  constructor(func, framerate) {
    this.loop_func = func;
    this.inteval = 1 / framerate * 1000;
    this.timeLastUpdate = 0;
  }

  start() {
    var gameLoop = this; // can't use this inside setInterval func
    this.timeLastUpdate = Date.now();
    var intervalId = null;

    intervalId = setInterval(function () {
      var timeElapsed = Date.now() - gameLoop.timeLastUpdate;
      gameLoop.timeLastUpdate = Date.now();
      if (gameLoop.loop_func(timeElapsed / 1000) && intervalId != null) {
        clearInterval(intervalId);
      }
    }, this.inteval);
  }
}

if (typeof module != 'undefined') {
  module.exports = GameLoop;
}
