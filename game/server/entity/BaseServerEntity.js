
var objects = require("../../common");

class BaseServerEntity {
  constructor(world, x, y, id) {
    this.world = world;
    this.id = id;
    this.s_pos = new objects.Position(x, y);
    this.s_bearing = 0;
    this.s_type = this.getType();
    this.world.addEntity(this);
  }

  delete() {
    this.world.removeEntity(this);
  }

  onUpdate() {
    throw new Error("Method 'onUpdate()' must be implemented.");
  }

  getType() {
    throw new Error("Method 'getType()' must be implemented.");
  }

  getSharedVars() {
    // TODO optimize (this func is run on all ents at every frames...)
    var res = {};
    for (var key in this) {
      if (key.startsWith("s_") || key == "id") {
        res[key] = this[key];
      }
    }
    return res;
  }
}

module.exports = BaseServerEntity;