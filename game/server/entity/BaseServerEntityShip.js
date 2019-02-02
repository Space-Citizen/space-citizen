
var Helper = require("../../common/Helper");
var BaseServerEntity = require("./BaseServerEntity");

class BaseServerEntityShip extends BaseServerEntity {
    constructor(world, x, y, id,
        speed, inertia_length, stop_target_dist = 2) {
        super(world, x, y, id);
        this.s_target = null;
        this.s_hp = 100;
        this.s_bearing = 0;
        this.speed = speed; // m/s
        this.inertia_length = inertia_length; // start slow down at
        this.stop_target_dist = stop_target_dist; // stop at this target dist
    }

    setTarget(pos) {
        this.s_bearing = Helper.getDirection(this.s_pos, pos);
        this.s_target = pos;
    }

    shipHit(attacker_entity, hp) {
        this.s_hp -= hp;
        if (this.s_hp <= 0) {
            this.kill();
        }
    }

    onUpdate(time_elapsed) {
        if (this.s_target != null) {
            var dist = Helper.dist(this.s_pos, this.s_target);
            // break speed
            var breaks = Math.min(Helper.map(dist, 0, this.inertia_length, 0, 1), 1);
            Helper.moveInDirection(this.s_pos, this.s_bearing,
                this.speed * breaks, time_elapsed);
            if (dist <= this.stop_target_dist) {
                // if target is closer than 1 meter, stop moving
                this.s_target = null;
            }
        }
    }
}

module.exports = BaseServerEntityShip;
