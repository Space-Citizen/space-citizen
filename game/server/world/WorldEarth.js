
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldEarth extends BaseWorld {
    onInit() {
        var sg = new Entity.ServerEntityStargate(this, 50, 0, "sg1");
        sg.openStargate("mars", 0, 0);
    }

    getWorldName() {
        return "earth";
    }
}

module.exports = WorldEarth;
