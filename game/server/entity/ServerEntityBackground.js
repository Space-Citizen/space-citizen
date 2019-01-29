
var Helper = require("../../common/Helper");
var WorldTypes = require("../../common/WorldTypes");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityBackground extends BaseServerEntity {
    constructor(world, id, world_type_name) {
        super(world, 0, 0, id);
        this.s_world_type = WorldTypes[world_type_name];
    }

    onUpdate(time_elapsed) {
    }

    getType() {
        return "background";
    }
}

module.exports = ServerEntityBackground;
