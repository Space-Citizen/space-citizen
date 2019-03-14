
var ServerBaseShip = require("./ServerBaseShip");

class ServerF302 extends ServerBaseShip {
    getType() {
        return "F-302";
    }
}

module.exports = ServerF302;