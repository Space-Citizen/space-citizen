
var Entity = require('../entity');
var Helper = require("../../common/Helper");
var Events = require('../../common/Events');

class BaseWorld {
    constructor(server) {
        this.server = server;
        this.entities = {};
        this.onInit();
        this._id_count = 0;
        this._id_prefix = 0;
    }

    onInterval(name, time_sec) {
        return Helper.onInterval(this, name, time_sec);
    }

    getFreeId() {
        if (this._id_count >= Number.MAX_SAFE_INTEGER - 1) {
            this._id_count = 0;
            this._id_prefix += 1;
        }
        this._id_count += 1;
        return "FID_" + this._id_prefix + '_' + this._id_count;
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
        if (entity.getType() == "player") {
            this.sendEventResetMap(entity);
        }
        this.sendEventNewEntity(entity);
    }

    _deleteEntity(entity) {
        delete this.entities[entity.id];
    }

    deleteEntity(entity) {
        this.runOnPlayers(function (player) {
            player.socket.emit(Events.SERVER_DELETE_ENTITY, entity.id);
        });
        this._deleteEntity(entity);
    }

    killEntity(entity) {
        this.runOnPlayers(function (player) {
            player.socket.emit(Events.SERVER_KILL_ENTITY, entity.id);
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
        server_player.socket.emit(Events.SERVER_UPDATE_ENTITIES, data);
    }

    sendEventNewEntity(entity) {
        var entity_info = entity.getSharedVars();
        Helper.updateDict(entity_info, entity.getConstVars());
        this.runOnPlayers(function (player) {
            //console.log(player.socket);
            player.socket.emit(Events.SERVER_NEW_ENTITY, entity_info);
        });
    }

    sendEventResetMap(player) {
        player.socket.emit(Events.SERVER_RESET_MAP);
        this.runOnEntities(function (entity) {
            var entity_info = entity.getSharedVars();
            Helper.updateDict(entity_info, entity.getConstVars());
            player.socket.emit(Events.SERVER_NEW_ENTITY, entity_info);
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

    getClosestPlayer(world_pos, max_dist = 0) {
        var res = null;
        var closest_dist = null;
        this.runOnPlayers(function (player) {
            var dist = Helper.dist(world_pos, player.s_pos);
            if (res == null || dist < closest_dist) {
                res = player;
                closest_dist = dist;
            }
        });
        if (max_dist && closest_dist > max_dist) {
            return null;
        }
        return res;
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
