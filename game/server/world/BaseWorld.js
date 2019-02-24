
var Entity = require('../entity');
var Helper = require("../../common/Helper");
var Events = require('../../common/Events');

class BaseWorld {
    constructor(server) {
        this.server = server;
        this.entities = {};
        this.onInit();
        this._id_count = 0;
    }

    getFreeId() {
        this._id_count += 1;
        return "FID_" + this._id_count;
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
        this.sendEventNewEntity(entity);
        if (entity.getType() == "player") {
            this.sendEventResetMap(entity);
        }
    }

    _deleteEntity(entity) {
        delete this.entities[entity.id];
    }

    deleteEntity(entity) {
        this.runOnPlayers(function (player) {
            player.client.emit(Events.SERVER_DELETE_ENTITY, entity.id);
        });
        this._deleteEntity(entity);
    }

    killEntity(entity) {
        this.runOnPlayers(function (player) {
            player.client.emit(Events.SERVER_KILL_ENTITY, entity.id);
        });
        this._deleteEntity(entity);
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

    sendEventNewEntity(entity) {
        var entity_info = entity.getSharedVars();
        Helper.updateDict(entity_info, entity.getConstVars());
        this.runOnPlayers(function (player) {
            //console.log(player.client);
            player.client.emit(Events.SERVER_NEW_ENTITY, entity_info);
        });
    }

    sendEventResetMap(player) {
        player.client.emit(Events.SERVER_RESET_MAP);
        this.runOnEntities(function (entity) {
            var entity_info = entity.getSharedVars();
            Helper.updateDict(entity_info, entity.getConstVars());
            player.client.emit(Events.SERVER_NEW_ENTITY, entity_info);
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