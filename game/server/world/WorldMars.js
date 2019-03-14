var Constants = require('../../common/Constants');
var Entity = require('../entity');
var BaseWorld = require('./BaseWorld');

class WorldMars extends BaseWorld {
    onInit() {
        this.max_hataks = 10;
        new Entity.ServerEntityBackground(this, "background", "MARS");

        // Stargate to earth, from bottom left (mars) to top left (earth)
        var sg = new Entity.ServerEntityStargate(this, 50, Constants.WORLD_SIZE_Y - 50, "sg-to-earh");
        sg.openStargate("earth", 70, 70);

        // Stargate to nebula, from bottom right (mars) to top left (nebula)
        var sg = new Entity.ServerEntityStargate(this, Constants.WORLD_SIZE_X - 50, Constants.WORLD_SIZE_Y - 50, "sg-to-nebula");
        sg.openStargate("nebula", 70, 70);
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
