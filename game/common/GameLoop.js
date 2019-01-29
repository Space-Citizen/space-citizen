
class GameLoop {
  constructor(func, framerate) {
    this.loop_func = func;
    this.inteval = 1 / framerate * 1000;
    this.time_last_update = 0;
  }

  start() {
    var game_loop = this; // can't use this inside setInterval func
    this.time_last_update = Date.now();
    var interval_id = null;

    interval_id = setInterval(function () {
      var time_elapsed = Date.now() - game_loop.time_last_update;
      game_loop.time_last_update = Date.now();
      if (game_loop.loop_func(time_elapsed / 1000) && interval_id != null) {
        clearInterval(interval_id);
      }
    }, this.inteval);
  }
}

if (typeof module != 'undefined') {
  module.exports = GameLoop;
}
