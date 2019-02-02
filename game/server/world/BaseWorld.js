
var Entity = require('../entity');
var Events = require('../../common/Events');

class BaseWorld {
    constructor(server) {
        this.server = server;
        this.entities = {};
        this.onInit();
    }

    onInit() {
        throw new Error("Method 'onInit()' must be implemented.");
    }

    getWorldName() {
        throw new Error("Method 'getWorldName()' must be implemented.");
    }

    getWorldByName(world_name) {
        return this.server.worlds[world_name];
    }

    addEntity(entity) {
        this.entities[entity.id] = entity;
    }

    _deleteEntity(entity) {
        delete this.entities[entity.id];
    }

    deleteEntity(entity) {
        this._deleteEntity(entity);
        this.runOnPlayers(function (player) {
            player.client.emit(Events.SERVER_DELETE_ENTITY, entity.id);
        });
    }

    killEntity(entity) {
        this._deleteEntity(entity);
        this.runOnPlayers(function (player) {
            player.client.emit(Events.SERVER_KILL_ENTITY, entity.id);
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

    onUpdate(time_elapsed) {
        var that = this;
        this.runOnEntities(function (entity) {
            entity.onUpdate(time_elapsed);
        });
        this.runOnPlayers(function (player) {
            that.sendEventUpdateEntities(player);
        });
    }
}

module.exports = BaseWorld;