
var objects = require("../common/objects");

class ServerEntity extends objects.Entity {
  constructor(world_manager, client, x, y) {
    super(client.id, x, y);
    this.client = client;
    this.wm = world_manager;
    this.target = null;
    this.speed = 0.1;
  }

  setTarget(pos) {
    this.target = pos;
  }

  onUpdate(timeElapsed) {
    if (this.target != null) {
      var dir_x = (this.target.x - this.pos.x);
      var dir_y = (this.target.y - this.pos.y);
      this.pos.x += dir_x * this.speed;
      this.pos.y += dir_y * this.speed;
    }
  }
}

module.exports = {
  default: ServerEntity
};