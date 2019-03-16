
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
        if (this.onInterval("change_target", 3)) {
            this.setRandomTarget();
        }
        if (this.onInterval("timer_launch_missile", 1.5)) {
            var target = this.world.getClosestPlayer(this.s_pos, Constants.Y_VIEW_RANGE);
            if (target) {
                this.launchMissile(target);
            }
        }
    }

    getType() {
        return "hatak";
    }
}

module.exports = ServerEntityHatak;
