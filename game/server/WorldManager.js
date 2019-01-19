
var entity = require('./entity');
var Events = require('../common/Events');

class WorldManager {
  constructor() {
    this.entities = {};
  }

  spawnPlayer(client) {
    this.entities[client.id] = new entity.ServerEntityPlayer(this, client, 50, 50);
  }

  sendEventUpdateEntities(server_player) {
    var data = [];
    for (var key in this.entities) {
      if (this.entities.hasOwnProperty(key)) {
        var entity = this.entities[key];
        data.push(entity.getSharedVars());
      }
    }
    server_player.client.emit(Events.UPDATE_ENTITIES, data);
  }

  movePlayer(client_id, pos) {
    this.entities[client_id].setTarget(pos);
  }

  despawnPlayer(client_id) {
    delete this.entities[client_id];
  }

  runOnEntities(func) {
    var entities = this.entities;
    for (var key in entities) {
      if (entities.hasOwnProperty(key)) {
        var entity = entities[key];
        func(entity);
      }
    }
  }

  onUpdate(timeElapsed) {
    var that = this;
    this.runOnEntities(function (entity) {
      entity.onUpdate(timeElapsed);
    });
    this.runOnEntities(function (entity) {
      if (entity.s_type == "player") {
        that.sendEventUpdateEntities(entity);
      }
    });
  }
}

module.exports = WorldManager;