
var objects = require("../../common");
var Events = require('../../common/Events');
var Helper = require("../../common/Helper");
var ServerEntityPlayer = require('./ServerEntityPlayer');
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityStargate extends BaseServerEntity {
    constructor(world_manager, x, y, id) {
        super(world_manager, x, y, id);
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

    onUpdate(timeElapsed) {
        this.s_stargate_open = this.dest ? true : false;
        if (!this.s_stargate_open) {
            return;
        }
        this.s_bearing += 0.5 * timeElapsed;
        var that = this;
        this.wm.runOnPlayers(function (entity) {
            var dist = Helper.dist(entity.s_pos, that.s_pos);
            if (dist <= 10) {
                that.teleportPlayer(entity, that.wm.getWorldByName(that.dest.name));
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
        var player = new ServerEntityPlayer(world, this.dest.x, this.dest.y, client);
        player.s_bearing = entity.s_bearing;
    }
}

module.exports = ServerEntityStargate;
