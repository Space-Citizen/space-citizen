
var ServerBaseShip = require("./ServerBaseShip");

class ServerDaedalus extends ServerBaseShip {
    getType() {
        return "Daedalus";
    }
}

module.exports = ServerDaedalus;