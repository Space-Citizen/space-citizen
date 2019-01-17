
class World {
  constructor() {
    this.width = 1000;
    this.height = 1000;
    this.entities = [];
  }
  addEntity(entity) {
    this.entities.push(entity);
  }
  removeEntity(id) {
    this.entities = this.entities.filter(function (value, index, arr) {
      return value.id != id;
    });
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  constructor(id) {
    this.id = id;
    this.bearing = 0;
    this.pos = new Position(0, 0);
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
    World,
    Position,
    Entity,
    GameLoop
  };
}
