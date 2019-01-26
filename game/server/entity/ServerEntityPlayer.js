
var Helper = require("../../common/Helper");
var BaseServerEntityShip = require("./BaseServerEntityShip");
var Events = require('../../common/Events');

class ServerEntityPlayer extends BaseServerEntityShip {
  constructor(world_manager, x, y, client) {
    super(world_manager, x, y, client.id,
      100,
      30);
    this.client = client;
    this.listeners = {};

    this.addListener(Events.PLAYER_MOVE_TO, this.eventMovePlayer.bind(this));
    this.addListener(Events.DISCONNECT, this.eventDisconnect.bind(this));
  }

  delete() {
    super.delete();
    this.removeListeners();
    this.wm.removeEntity(this.id);
  }

  eventMovePlayer(pos) {
    this.setTarget(pos);
  }

  eventDisconnect() {
    this.delete();
  }


  addListener(event_name, func) {
    this.listeners[event_name] = func;
    this.client.on(event_name, func);
  }

  removeListeners() {
    for (var listener in this.listeners) {
      this.client.off(listener, this.listeners[listener]);
    }
  }

  getType() {
    return "player";
  }
}

module.exports = ServerEntityPlayer;
