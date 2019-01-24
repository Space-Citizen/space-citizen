
var entity = require('./entity');
var Events = require('../common/Events');

class WorldManager {
  constructor(server) {
    this.server = server;
    this.entities = {};

    this.entities["sg1"] = new entity.ServerEntityStargate(this, 10, 10, "sg1");
    /*
    for (var x = 5; x < 100; x += 1) {
      this.entities["sg" + x] = new entity.ServerEntityStargate(this, 0.2 * x, 0, "sg" + x);
    }

    this.entities["sg2"] = new entity.ServerEntityStargate(this, 0.2, 0, "sg2");
    this.entities["sg3"] = new entity.ServerEntityStargate(this, 0, 0.2, "sg3");
    this.entities["sg4"] = new entity.ServerEntityStargate(this, 0.2, 0.2, "sg4");
    */
  }

  spawnPlayer(client) {
    this.entities[client.id] = new entity.ServerEntityPlayer(this, 1, 1, client);
    var that = this;
    client.on(Events.PLAYER_MOVE_TO, function (pos) {
      that.eventMovePlayer(client.id, pos);
    });

    client.on(Events.DISCONNECT, function () {
      console.log(client.id + " disconnected");
      that.eventDespawnPlayer(client.id);
    });

    //client.removeAllListeners(Events.DISCONNECT);
  }

  eventMovePlayer(client_id, pos) {
    this.entities[client_id].setTarget(pos);
  }

  eventDespawnPlayer(client_id) {
    this.removeEntity(client_id);
  }

  sendEventUpdateEntities(server_player) {
    var data = [];
    for (var key in this.entities) {
      if (this.entities.hasOwnProperty(key)) {
        var entity = this.entities[key];
        data.push(entity.getSharedVars());
      }
    }
    server_player.client.emit(Events.SERVER_UPDATE_ENTITIES, data);
  }

  removeEntity(id) {
    delete this.entities[id];
    this.runOnPlayers(function (entity) {
      entity.client.emit(Events.SERVER_DELETE_ENTITY, id);
    });
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

  runOnPlayers(func) {
    this.runOnEntities(function (entity) {
      if (entity.s_type == "player") {
        func(entity);
      }
    });
  }

  onUpdate(timeElapsed) {
    var that = this;
    this.runOnEntities(function (entity) {
      entity.onUpdate(timeElapsed);
    });
    this.runOnPlayers(function (player) {
      that.sendEventUpdateEntities(player);
    });
  }
}

module.exports = WorldManager;