
var Helper = require("../../common/Helper");
var BaseServerEntityShip = require("./BaseServerEntityShip");
var ServerEntityMissile = require("./ServerEntityMissile");
var Events = require('../../common/Events');

// API
const api = require('../api');

class ServerEntityPlayer extends BaseServerEntityShip {
  constructor(world, x, y, client, name, ship, token, faction) {
    super(world, x, y, client.id, name, ship);
    this.client = client;
    this.listeners = {};
    this.ship = ship;
    this.token = token;
    this.s_faction = faction;
    this.addListener(Events.DISCONNECT, this.eventDisconnect.bind(this));
    this.addListener(Events.PLAYER_CALL_FUNCTION, this.eventPlayerCallFunction.bind(this));
    this.onInit();
  }

  teleportTo(world, dest_x, dest_y) {
    super.teleportTo(world, dest_x, dest_y);
    this.world.sendEventResetMap(this);
  }

  delete() {
    super.delete();
    this.removeListeners();
  }

  playerMoveTo(world_pos) {
    // TODO check args
    this.setTarget(world_pos);
  }

  playerLaunchMissile(entity_id) {
    new ServerEntityMissile(this.world, this.world.getFreeId(), this,
      this.world.entities[entity_id]);
  }

  eventPlayerCallFunction(func_name, ...args) {
    var func = this[func_name].bind(this);
    // check if in allowed list
    if (func.length != args.length) {
      console.error("Function " + func_name + " called with " + args);
      return;
    }
    if (!(func_name in this.getSharedFuncs())) {
      console.error("Function not allowed: " + func_name);
      return;
    }
    func(...args);
  }

  eventDisconnect() {
    api.setUserPos(this.token, this.world.getWorldName(), this.s_pos).catch(error => { console.log(error) });
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

  getSharedFuncs() {
    var res = {};
    var names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for (var x in names) {
      var key = names[x];
      if (key.startsWith("player")) {
        res[key] = this[key];
      }
    }
    return res;
  }

  getType() {
    return "player";
  }
}

module.exports = ServerEntityPlayer;
