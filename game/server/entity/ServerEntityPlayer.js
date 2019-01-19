
var objects = require("../../common");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityPlayer extends BaseServerEntity {
  onInit() {
    this.s_target = null;
    this.s_speed = 0.1;
  }

  setTarget(pos) {
    this.s_target = pos;
  }

  onUpdate(timeElapsed) {
    if (this.s_target != null) {
      var dir_x = (this.s_target.x - this.s_pos.x);
      var dir_y = (this.s_target.y - this.s_pos.y);
      this.s_pos.x += dir_x * this.s_speed;
      this.s_pos.y += dir_y * this.s_speed;
    }
  }

  getType() {
    return "player";
  }
}

module.exports = ServerEntityPlayer;
