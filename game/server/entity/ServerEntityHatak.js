
var Helper = require("../../common/Helper");
var BaseServerEntityShip = require("./BaseServerEntityShip");
var ServerEntityMissile = require("./ServerEntityMissile");
var Events = require('../../common/Events');
var ServerHatak = require("../ship/ServerHatak");

// API
const api = require('../api');

class ServerEntityHatak extends BaseServerEntityShip {
    constructor(world, x, y, id) {
        super(world, x, y, id, "Hatak", new ServerHatak());
        this.c_faction = "npc";
        this.onInit();
    }

    launchMissile(entity_id) {
        new ServerEntityMissile(this.world, this.world.getFreeId(), this,
            this.world.entities[entity_id]);
    }

    getType() {
        return "hatak";
    }
}

module.exports = ServerEntityHatak;
