
var Helper = require("../../common/Helper");
var BaseServerEntity = require("./BaseServerEntity");

class BaseServerEntityShip extends BaseServerEntity {
    constructor(world, x, y, id, name, ship) {
        super(world, x, y, id);
        this.stop_target_dist = 2; // stop ship at this target dist
        this.c_name = name;
        this.s_target = null;
        this.s_hp = 100;
        this.s_bearing = 0;
        // set ship variables:
        this.c_ship_type = ship.getType();
        this.speed = ship.getSpeed();
        this.inertia_length = ship.getInertiaLength();
    }

    teleportTo(world, dest_x, dest_y) {
        super.teleportTo(world, dest_x, dest_y);
        this.s_target = null;
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
