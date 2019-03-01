var Constants = require('../../common/Constants');
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldMars extends BaseWorld {
    onInit() {
        new Entity.ServerEntityBackground(this, "background", "MARS");
        var sg = new Entity.ServerEntityStargate(this, 50, 50, "sga");
        sg.openStargate("earth", 0, 0);

        var sg = new Entity.ServerEntityStargate(this, 0, 0, "sg5");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, 0, "sg2");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, Constants.WORLD_SIZE_Y, "sg3");
        var sg = new Entity.ServerEntityStargate(this, 0, Constants.WORLD_SIZE_Y, "sg4");

        var hatak = new Entity.ServerEntityHatak(
            this,
            Constants.WORLD_SIZE_X / 2,
            Constants.WORLD_SIZE_Y / 2,
            "hatak1"
        );
    }

    getWorldName() {
        return "mars";
    }
}

module.exports = WorldMars;
