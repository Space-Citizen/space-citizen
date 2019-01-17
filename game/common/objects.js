
class Position {
  constructor(x, y) {
    this.set(x, y);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  constructor(id, x, y) {
    this.id = id;
    this.bearing = 0;
    this.pos = new Position(x, y);
  }

  _sharedVars() {
    return ['bearing', 'pos', 'id'];
  }

  getSharedVars() {
    var res = {};
    var sharedVars = this._sharedVars();
    for (var x in sharedVars) {
      var sharedVar = sharedVars[x];
      res[sharedVar] = this[sharedVar];
    }
    return res;
  }
}

class GameLoop {
  constructor(func, framerate) {
    this.loop_func = func;
    this.inteval = 1 / framerate * 1000;
    this.timeLastUpdate = 0;
  }

  start() {
    var gameLoop = this; // can't use this inside setInterval func
    this.timeLastUpdate = Date.now();
    setInterval(function () {
      var timeElapsed = Date.now() - gameLoop.timeLastUpdate;
      gameLoop.timeLastUpdate = Date.now();
      gameLoop.loop_func(timeElapsed);
    }, this.inteval);
  }
}

if (typeof module != 'undefined') {
  module.exports = {
    Position,
    GameLoop,
    Entity
  };
}
