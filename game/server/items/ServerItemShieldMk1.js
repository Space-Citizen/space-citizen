

var BaseServerItemShield = require("./BaseServerItemShield")


class ServerItemShieldMk1 extends BaseServerItemShield {

    getRegen() {
        return 1;
    }

    getStrength() {
        return 20;
    }
}

module.exports = ServerItemShieldMk1;
