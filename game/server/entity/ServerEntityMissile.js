
var Helper = require("../../common/Helper");
var WorldTypes = require("../../common/WorldTypes");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityMissile extends BaseServerEntity {
    constructor(world, id, attacker_entity, target_entity) {
        super(world, attacker_entity.s_pos.x, attacker_entity.s_pos.y, id);
        this.s_bearing = 0;
        this.speed = 100;
        this.blow_distance = 2;
        this.damage = 10;
        // this.warm_up_time = 2;
        // this.warm = 0;
        this.target_entity = target_entity;
        this.onInit();
    }

    onUpdate(time_elapsed) {
        if (!this.target_entity) {
            console.error("Missile got no entity");
            this.kill();
            return;
        }
        var target_pos = this.target_entity.s_pos;
        this.s_bearing = Helper.getDirection(this.s_pos, target_pos);
        Helper.moveInDirection(this.s_pos, this.s_bearing,
            this.speed, time_elapsed);
        var dist = Helper.dist(this.s_pos, target_pos);
        if (dist <= this.blow_distance) {
            // if target is closer than 1 meter, stop moving
            this.target_entity.shipHit(this.attacker, this.damage);
            this.kill();
        }
    }

    getType() {
        return "missile";
    }
}

module.exports = ServerEntityMissile;
