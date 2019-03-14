var Constants = require('../../common/Constants');
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldNebula extends BaseWorld {
    onInit() {
        new Entity.ServerEntityBackground(this, "background", "NEBULA");

        // Stargate to earth, from bottom left (nebula) to top right (earth)
        var sg = new Entity.ServerEntityStargate(this, 50, Constants.WORLD_SIZE_Y - 50, "sg-to-earth");
        sg.openStargate("earth", Constants.WORLD_SIZE_X - 70, 70);

        // Stargate to mars, from top left (nebula) to bottom right (mars)
        var sg = new Entity.ServerEntityStargate(this, 50, 50, "sg-to-mars");
        sg.openStargate("mars", Constants.WORLD_SIZE_X - 70, Constants.WORLD_SIZE_Y - 70);
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
    }

    getWorldName() {
        return "nebula";
    }
}

module.exports = WorldNebula;
