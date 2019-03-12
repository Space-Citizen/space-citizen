
var objects = require("../../common");
var Events = require('../../common/Events');

class BaseServerEntity {
  constructor(world, x, y, id) {
    this.world = world;
    this.id = id;
    this.s_pos = new objects.Position(x, y);
    this.s_type = this.getType();
  }

  onInterval(name, time_sec) {
    // returns true every 'time_sec', else return false
    // name will be used as an identifier
    var id = "__interval_" + name;
    if (!(id in this) || Date.now() > this[id]) {
      this[id] = Date.now() + time_sec * 1000;
      return true;
    }
    return false;
  }

  onInit() {
    this.world.addEntity(this);
  }

  onUpdate() {
    throw new Error("Method 'onUpdate()' must be implemented.");
  }

  getType() {
    throw new Error("Method 'getType()' must be implemented.");
  }

  teleportTo(world, dest_x, dest_y) {
    this.world.deleteEntity(this);
    this.world = world;
    this.s_pos.x = dest_x;
    this.s_pos.y = dest_y;
    this.world.addEntity(this);
  }

  serverCallFunction(func_name, ...args) {
    if (!func_name.startsWith("s_")) {
      console.error("serverCallFunction: function name must start with 's_' : " + func_name);
    }
    var that = this;
    this.world.runOnPlayers(function (player) {
      player.socket.emit(Events.SERVER_CALL_FUNCTION, that.id, func_name, ...args);
    });
  }

  delete() {
    this.world.deleteEntity(this);
  }

  kill() {
    this.world.killEntity(this);
  }

  _getVarsWithPrefix(prefix) {
    var res = {};
    for (var key in this) {
      //console.log(key);
      if (key.startsWith(prefix) || key == "id") {
        res[key] = this[key];
      }
    }
    return res;
  }

  getSharedVars() {
    // TODO optimize (this func is run on all ents at every frames...)
    return this._getVarsWithPrefix("s_");
  }

  getConstVars() {
    // variables which will not be updated
    return this._getVarsWithPrefix("c_");
  }
}

module.exports = BaseServerEntity;