
var objects = require("../../common");
var Events = require('../../common/Events');

class BaseServerEntity {
  constructor(world, x, y, id) {
    this.world = world;
    this.id = id;
    this.s_pos = new objects.Position(x, y);
    this.s_type = this.getType();
    this.world.addEntity(this);
  }

  teleportTo(world, dest_x, dest_y) {
    this.world.deleteEntity(this);
    this.world = world;
    this.s_pos.x = dest_x;
    this.s_pos.y = dest_y;
    this.world.addEntity(this);
  }

  serverCallFunction(func_name, ...args) {
    if (!func_name.startsWith("server")) {
      console.error("serverCallFunction: function name must start with 'server'");
    }
    var that = this;
    this.world.runOnPlayers(function (player) {
      player.client.emit(Events.SERVER_CALL_FUNCTION, that.id, func_name, ...args);
    });
  }

  delete() {
    this.world.deleteEntity(this);
  }

  kill() {
    this.world.killEntity(this);
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