
var objects = require("../../common");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityPlayer extends BaseServerEntity {
  constructor(world_manager, x, y, client) {
    super(world_manager, x, y, client.id);
    this.client = client;
  }

  onInit() {
    this.s_target = null;
    this.s_speed = 1.5;
  }

  setTarget(pos) {
    var m = (this.s_pos.y - pos.y) / (this.s_pos.x - pos.x);
    var ang = Math.atan(m);
    if (this.s_pos.x > pos.x) {
      ang += Math.PI;
    }
    this.s_bearing = ang + Math.PI / 2;
    this.s_target = pos;
  }

  onUpdate(timeElapsed) {
    //this.s_bearing += 0.01;
    if (this.s_target != null) {
      var dir_x = (this.s_target.x - this.s_pos.x);
      var dir_y = (this.s_target.y - this.s_pos.y);
      this.s_pos.x += dir_x * Math.min(this.s_speed * timeElapsed, 1);
      this.s_pos.y += dir_y * Math.min(this.s_speed * timeElapsed, 1);
    }
  }

  getType() {
    return "player";
  }
}

module.exports = ServerEntityPlayer;
