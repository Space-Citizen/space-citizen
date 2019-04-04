
var ServerBaseShip = require("./ServerBaseShip");

class ServerHatak extends ServerBaseShip {

    getSpeed() {
        // m/s
        return 45;
    }

    getType() {
        return "Hatak";
    }
}

module.exports = ServerHatak;