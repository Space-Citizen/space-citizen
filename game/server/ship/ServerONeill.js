
var ServerBaseShip = require("./ServerBaseShip");

class ServerONeill extends ServerBaseShip {
    getSpeed() {
        // m/s
        return 100;
    }


    getType() {
        return "ONeill";
    }
}

module.exports = ServerONeill;