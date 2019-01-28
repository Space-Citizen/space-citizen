
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldEarth extends BaseWorld {
    onInit() {
        for (var x = 0; x < 100; x += 1) {
            var sg = new Entity.ServerEntityStargate(this, 50, 5 * x, "sg" + x);
            sg.openStargate("mars", 0, 0);
        }
        var sg = new Entity.ServerEntityStargate(this, 50, 0, "sg1");
        sg.openStargate("mars", 0, 0);
    }

    getWorldName() {
        return "earth";
    }
}

module.exports = WorldEarth;
