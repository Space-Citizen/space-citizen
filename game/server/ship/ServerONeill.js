
var ServerBaseShip = require("./ServerBaseShip");

class ServerONeill extends ServerBaseShip {
    getSpeed() {
        // m/s
        return 120;
    }


    getType() {
        return "ONeill";
    }
}

module.exports = ServerONeill;