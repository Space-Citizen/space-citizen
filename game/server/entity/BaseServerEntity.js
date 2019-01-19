
var objects = require("../../common");

class BaseServerEntity {
  constructor(world_manager, client, x, y) {
    this.client = client;
    this.wm = world_manager;
    this.id = client.id;
    this.s_pos = new objects.Position(x, y);
    this.s_bearing = 0;
    this.s_type = this.getType();
    this.onInit();
  }

  onInit() {
    throw new Error("Method 'onInit()' must be implemented.");
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