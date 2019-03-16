
var ServerBaseShip = require("./ServerBaseShip");

class ServerONeill extends ServerBaseShip {

    getSpeed() {
        // m/s
        return 70;
    }

    getType() {
        return "O'Neill";
    }
}

module.exports = ServerONeill;