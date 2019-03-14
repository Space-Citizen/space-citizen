
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');
var Constants = require('../../common/Constants');

class WorldEarth extends BaseWorld {
    onInit() {
        new Entity.ServerEntityBackground(this, "background", "EARTH");

        // Stargate to mars, from top left (earth) to bottom left (mars)
        var sg = new Entity.ServerEntityStargate(this, 50, 50, "sg-to-mars");
        sg.openStargate("mars", 70, Constants.WORLD_SIZE_Y - 70);

        // Stargate to nebula, from top right (earth) to bottom left (nebula)
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X - 50, 50, "sg-to-nebula");
        sg.openStargate("nebula", 70, Constants.WORLD_SIZE_Y - 70);
    }

    getWorldName() {
        return "earth";
    }
}

module.exports = WorldEarth;
