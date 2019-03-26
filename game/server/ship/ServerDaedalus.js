
var ServerBaseShip = require("./ServerBaseShip");

class ServerDaedalus extends ServerBaseShip {
    getMaxHp() {
        return 200;
    }

    getType() {
        return "Daedalus";
    }
}

module.exports = ServerDaedalus;