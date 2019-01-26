
var objects = require("../../common");

class BaseServerEntity {
  constructor(world_manager, x, y, id) {
    this.wm = world_manager;
    this.id = id;
    this.s_pos = new objects.Position(x, y);
    this.s_bearing = 0;
    this.s_type = this.getType();
    this.wm.addEntity(this);
  }

  delete() {
    this.wm.removeEntity(this);
  }

  onUpdate() {
    throw new Error("Method 'onUpdate()' must be implemented.");
  }

  getType() {
    throw new Error("Method 'getType()' must be implemented.");
  }

  getSharedVars() {
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