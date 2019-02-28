
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');
var Constants = require('../../common/Constants');

class WorldEarth extends BaseWorld {
    onInit() {
        new Entity.ServerEntityBackground(this, "background", "EARTH");
        /*
        for (var x = 0; x < 100; x += 1) {
            var sg = new Entity.ServerEntityStargate(this, 50, 5 * x, "sg" + x);
            sg.openStargate("mars", 0, 0);
        } */
        var sg = new Entity.ServerEntityStargate(this, 50, 50, "sg1");
        sg.openStargate("mars", 0, 0);

        var sg = new Entity.ServerEntityStargate(this, 0, 0, "sg5");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, 0, "sg2");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, Constants.WORLD_SIZE_Y, "sg3");
        var sg = new Entity.ServerEntityStargate(this, 0, Constants.WORLD_SIZE_Y, "sg4");
    }

    getWorldName() {
        return "earth";
    }
}

module.exports = WorldEarth;
