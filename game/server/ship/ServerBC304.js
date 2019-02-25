
var ServerBaseShip = require("./ServerBaseShip");

class ServerBC304 extends ServerBaseShip {
    getType() {
        return "BC304";
    }
}

module.exports = ServerBC304;