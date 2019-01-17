
var ServerEntity = require('./ServerEntity').default;
var Events = require('../common/events').default;

class WorldManager {
  constructor() {
    this.players = {};
  }

  spawnPlayer(client) {
    this.players[client.id] = new ServerEntity(this, client, 50, 50);
  }

  sendEventUpdateEntities(server_player) {
    var data = [];
    for (var key in this.players) {
      if (this.players.hasOwnProperty(key)) {
        var player = this.players[key];
        data.push(player.getSharedVars());
      }
    }
    server_player.client.emit(Events.UPDATE_ENTITIES, data);
  }

  movePlayer(client_id, pos) {
    this.players[client_id].target = pos;
  }

  despawnPlayer(client_id) {
    delete this.players[client_id];
  }

  onUpdate(timeElapsed) {
    var players = this.players;
    for (var key in players) {
      if (players.hasOwnProperty(key)) {
        var player = players[key];
        player.onUpdate(timeElapsed);
      }
    }
    for (var key in players) {
      if (players.hasOwnProperty(key)) {
        var player = players[key];
        this.sendEventUpdateEntities(player);
      }
    }
    //console.log(Object.keys(players));
  }
}

module.exports = {
  default: WorldManager
};