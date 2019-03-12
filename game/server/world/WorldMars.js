var Constants = require('../../common/Constants');
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldMars extends BaseWorld {
    onInit() {
        this.max_hataks = 5;
        new Entity.ServerEntityBackground(this, "background", "MARS");
        var sg = new Entity.ServerEntityStargate(this, 100, 100, "sga");
        sg.openStargate("earth", 150, 150);

        var sg = new Entity.ServerEntityStargate(this, 0, 0, "sg5");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, 0, "sg2");
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X, Constants.WORLD_SIZE_Y, "sg3");
        var sg = new Entity.ServerEntityStargate(this, 0, Constants.WORLD_SIZE_Y, "sg4");

    }

    countHataks() {
        var res = 0;
        this.runOnEntities(function (entity) {
            if (entity instanceof Entity.ServerEntityHatak) {
                res += 1;
            }
        });
        return res;
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        if (this.onInterval("hatak_respawn", 10)
            && this.countHataks() < this.max_hataks) {
            var hatak = new Entity.ServerEntityHatak(
                this,
                Constants.WORLD_SIZE_X / 2,
                Constants.WORLD_SIZE_Y / 2,
                this.getFreeId()
            );
        }
    }

    getWorldName() {
        return "mars";
    }
}

module.exports = WorldMars;
