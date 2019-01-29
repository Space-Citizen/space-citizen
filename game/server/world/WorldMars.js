
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldMars extends BaseWorld {
    onInit() {
        new Entity.ServerEntityBackground(this, "background", "MARS");
        var sg = new Entity.ServerEntityStargate(this, 50, 0, "sga");
        sg.openStargate("earth", 0, 0);
    }

    getWorldName() {
        return "mars";
    }
}

module.exports = WorldMars;
