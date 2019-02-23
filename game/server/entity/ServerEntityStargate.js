
var objects = require("../../common");
var Events = require('../../common/Events');
var Helper = require("../../common/Helper");
var ServerEntityPlayer = require('./ServerEntityPlayer');
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityStargate extends BaseServerEntity {
    constructor(world, x, y, id) {
        super(world, x, y, id);
        this.dest = null;
        this.s_stargate_open = false;
    }

    openStargate(dest_world_name, dest_x, dest_y) {
        this.dest = {
            "name": dest_world_name,
            "x": dest_x,
            "y": dest_y
        }
    }

    closeStargate() {
        this.dest = null;
    }

    onUpdate(time_elapsed) {
        this.s_stargate_open = this.dest ? true : false;
        if (!this.s_stargate_open) {
            return;
        }
        var that = this;
        // TODO optimize (dont run at every frame?)
        this.world.runOnPlayers(function (entity) {
            var dist = Helper.dist(entity.s_pos, that.s_pos);
            if (dist <= 10) {
                that.serverCallFunction("serverStargateUsed");
                that.teleportPlayer(entity, that.world.getWorldByName(that.dest.name));
            }
        });
    }

    getType() {
        return "stargate";
    }

    teleportPlayer(entity, world) {
        var client = entity.client;
        entity.delete()
        entity.client.emit(Events.SERVER_RESET_MAP);
        var user_info = entity.user_info;
        //console.log(world.getWorldName());
        user_info.spawn_world = world.getWorldName();
        user_info.spawn_world_x = this.dest.x;
        user_info.spawn_world_y = this.dest.y;
        var player = this.world.server.spawnPlayer(client, user_info);
        player.s_bearing = entity.s_bearing;
        player.s_hp = entity.s_hp;
    }
}

module.exports = ServerEntityStargate;
