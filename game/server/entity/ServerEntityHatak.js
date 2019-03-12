
var Helper = require("../../common/Helper");
var BaseServerEntityShip = require("./BaseServerEntityShip");
var ServerEntityMissile = require("./ServerEntityMissile");
var Events = require('../../common/Events');
var ServerHatak = require("../ship/ServerHatak");
var Constants = require('../../common/Constants');
var Position = require('../../common/Position');

// API
const api = require('../api');

class ServerEntityHatak extends BaseServerEntityShip {
    constructor(world, x, y, id) {
        super(world, x, y, id, "Hatak", new ServerHatak());
        this.c_faction = "npc";
        this.onInit();
        this.time_changed_target = null;
        this.change_target_time = 3; // seconds
        this.time_launched_missile = null;
        this.launch_missile_time = 1; // seconds
    }

    launchMissile(entity) {
        new ServerEntityMissile(
            this.world, this.world.getFreeId(),
            this,
            entity
        );
    }

    setRandomTarget() {
        this.setTarget(
            new Position(
                Helper.randint(0, Constants.WORLD_SIZE_X),
                Helper.randint(0, Constants.WORLD_SIZE_Y))
        );
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        var time = Date.now() / 1000;
        if (!this.time_changed_target
            || time - this.time_changed_target > this.change_target_time) {
            this.setRandomTarget();
            this.time_changed_target = time;
        }
        if (!this.time_launched_missile
            || time - this.time_launched_missile > this.launch_missile_time) {
            var target = this.world.getClosestPlayer(this.s_pos, Constants.Y_VIEW_RANGE);
            if (target) {
                this.launchMissile(target);
            }
            this.time_launched_missile = time;
        }
    }

    getType() {
        return "hatak";
    }
}

module.exports = ServerEntityHatak;
