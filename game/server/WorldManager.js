
var Entity = require('./entity');
var Events = require('../common/Events');

class WorldManager {
  constructor(server) {
    this.server = server;
    this.entities = {};

    var sg = new Entity.ServerEntityStargate(this, 50, 0, "sg1");
    sg.openStargate("mars", 0, 0);
    /*
    for (var x = 5; x < 100; x += 1) {
      new entity.ServerEntityStargate(this, 0.2 * x, 0, "sg" + x);
    }
    */
  }

  getWorldByName(world_name) {
    return this.server.worlds[world_name];
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
  }

  removeEntity(entity) {
    delete this.entities[entity.id];
    this.runOnPlayers(function (player) {
      player.client.emit(Events.SERVER_DELETE_ENTITY, entity.id);
    });
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