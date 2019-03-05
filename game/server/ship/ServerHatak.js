
var ServerBaseShip = require("./ServerBaseShip");

class ServerHatak extends ServerBaseShip {

    getSpeed() {
        // m/s
        return 55;
    }

    getType() {
        return "Hatak";
    }
}

module.exports = ServerHatak;