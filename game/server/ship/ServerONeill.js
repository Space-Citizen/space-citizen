
var ServerBaseShip = require("./ServerBaseShip");

class ServerONeill extends ServerBaseShip {
    getType() {
        return "ONeill";
    }
}

module.exports = ServerONeill;