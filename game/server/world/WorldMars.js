
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldMars extends BaseWorld {
    onInit() {
        var sg = new Entity.ServerEntityStargate(this, 50, 0, "sg1");
    }

    getWorldName() {
        return "mars";
    }
}

module.exports = WorldMars;
