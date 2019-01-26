
var Helper = require("../../common/Helper");
var BaseServerEntity = require("./BaseServerEntity");

class BaseServerEntityShip extends BaseServerEntity {
    constructor(world_manager, x, y, id,
        speed, inertia_length, stop_target_dist = 2) {
        super(world_manager, x, y, id);
        this.s_target = null;
        this.speed = speed; // m/s
        this.inertia_length = inertia_length; // start slow down at
        this.stop_target_dist = stop_target_dist; // stop at this target dist

    }

    setTarget(pos) {
        var m = (this.s_pos.y - pos.y) / (this.s_pos.x - pos.x);
        var ang = Math.atan(m);
        if (this.s_pos.x > pos.x) {
            ang += Math.PI;
        }
        this.s_bearing = ang;
        this.s_target = pos;
    }

    onUpdate(timeElapsed) {
        if (this.s_target != null) {
            var dist = Helper.dist(this.s_pos, this.s_target);
            var breaks = Math.min(Helper.map(dist, 0, this.inertia_length, 0, 1), 1); // break speed
            var dir_x = Math.cos(this.s_bearing) * this.speed * breaks;
            var dir_y = Math.sin(this.s_bearing) * this.speed * breaks;
            this.s_pos.x += dir_x * timeElapsed;
            this.s_pos.y += dir_y * timeElapsed;
            if (dist <= this.stop_target_dist) {
                // if target is closer than 1 meter, stop moving
                this.s_target = null;
            }
        }
    }
}

module.exports = BaseServerEntityShip;
