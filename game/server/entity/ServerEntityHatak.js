
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
    }

    launchMissile(entity_id) {
        new ServerEntityMissile(this.world, this.world.getFreeId(), this,
            this.world.entities[entity_id]);
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
    }

    getType() {
        return "hatak";
    }
}

module.exports = ServerEntityHatak;
