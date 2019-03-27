
var Helper = require("../../common/Helper");
var BaseServerEntity = require("./BaseServerEntity");
var api = require('../api');

class BaseServerEntityShip extends BaseServerEntity {
    constructor(world, x, y, id, name, ship, items_name) {
        super(world, x, y, id);
        this.ship = ship;
        this.stop_target_dist = 2; // stop ship at this target dist
        this.speed = ship.getSpeed();
        this.inertia_length = ship.getInertiaLength();
        this.shield_regen = 1;
        this.c_items_name = items_name;
        this.c_name = name;
        this.s_target = null;
        this.c_max_shield = 50;
        this.s_shield = this.c_max_shield;
        this.c_max_hp = ship.getMaxHp();
        this.s_hp = this.c_max_hp;
        this.s_bearing = 0;
        this.c_ship_type = ship.getType();
    }

    initItems() {

    }


    teleportTo(world, dest_x, dest_y) {
        super.teleportTo(world, dest_x, dest_y);
        this.s_target = null;
    }

    setTarget(pos) {
        this.s_bearing = Helper.getDirection(this.s_pos, pos);
        this.s_target = pos;
    }

    // Amount of xp and money given to the player that killed the ship
    getKillRewards() {
        // Default value
        return ({ xp: 50, money: 500 });
    }

    // Give a reward to the player that killed this entity
    giveRewards(attacker_entity) {
        // If attacker has no user_id, leave
        if (!attacker_entity || !attacker_entity.user_id)
            return;

        // Get the reward for this kill
        var rewards = this.getKillRewards();

        // Give experience
        api.addExperience(attacker_entity.user_id, rewards.xp).catch(error => {
            console.log("Add exeperience error: ", error);
        });
        // Give money
        api.addMoney(attacker_entity.user_id, rewards.money).catch(error => {
            console.log("Add money error: ", error);
        });
    }

    shipHit(attacker_entity, hp) {
        var shield_after_hit = this.s_shield - hp;
        if (shield_after_hit > 0) {
            this.s_shield -= hp;
        } else {
            this.s_hp -= -shield_after_hit;
            this.s_shield = 0;
        }
        if (this.s_hp <= 0) {
            // Give rewards to the user that killed the ship
            this.giveRewards(attacker_entity);
            this.kill();
        }
    }

    onUpdate(time_elapsed) {
        if (Helper.onInterval(this, "shieldRegen", 1)) {
            if (this.s_shield < this.c_max_shield) {
                this.s_shield += this.shield_regen;
            }
        }

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
