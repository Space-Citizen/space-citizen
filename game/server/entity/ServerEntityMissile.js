
var Helper = require("../../common/Helper");
var WorldTypes = require("../../common/WorldTypes");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityMissile extends BaseServerEntity {
    constructor(world, id, attacker_entity, target_entity) {
        super(world, attacker_entity.s_pos.x, attacker_entity.s_pos.y, id);
        this.s_bearing = 0;
        this.speed = 100;
        this.blow_distance = 5;
        this.target_entity = target_entity;

    }

    onUpdate(time_elapsed) {
        var target_pos = this.target_entity.s_pos;
        var m = (this.s_pos.y - target_pos.y) / (this.s_pos.x - target_pos.x);
        var ang = Math.atan(m);
        if (this.s_pos.x > target_pos.x) {
            ang += Math.PI;
        }
        this.s_bearing = ang;
        var dist = Helper.dist(this.s_pos, target_pos);
        var dir_x = Math.cos(this.s_bearing) * this.speed;
        var dir_y = Math.sin(this.s_bearing) * this.speed;
        this.s_pos.x += dir_x * time_elapsed;
        this.s_pos.y += dir_y * time_elapsed;
        if (dist <= this.blow_distance) {
            // if target is closer than 1 meter, stop moving
            this.target_entity.playerHit(10);
            this.delete();
        }

    }

    getType() {
        return "missile";
    }
}

module.exports = ServerEntityMissile;
