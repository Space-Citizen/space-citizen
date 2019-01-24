
var Helper = require("../../common/Helper");
var BaseServerEntityShip = require("./BaseServerEntityShip");

class ServerEntityPlayer extends BaseServerEntityShip {
  constructor(world_manager, x, y, client) {
    super(world_manager, x, y, client.id,
      100,
      30);
    this.client = client;
  }

  getType() {
    return "player";
  }
}

module.exports = ServerEntityPlayer;
