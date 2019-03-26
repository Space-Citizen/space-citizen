
var ServerBaseShip = require("./ServerBaseShip");

class ServerONeill extends ServerBaseShip {

    getMaxHp() {
        return 250;
    }

    getSpeed() {
        // m/s
        return 70;
    }

    getType() {
        return "O'Neill";
    }
}

module.exports = ServerONeill;