
var objects = require("../../common");
var BaseServerEntity = require("./BaseServerEntity");

class ServerEntityStargate extends BaseServerEntity {
    onInit() {
    }

    onUpdate(timeElapsed) {
        this.s_bearing += 0.5 * timeElapsed;
    }

    getType() {
        return "stargate";
    }
}

module.exports = ServerEntityStargate;
