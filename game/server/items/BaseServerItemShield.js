
var BaseServerItem = require("./BaseServerItem")

class BaseServerItemShield extends BaseServerItem {

    getRegen() {
        throw new Error("Method 'getRegen()' must be implemented.");
    }

    getStrength() {
        throw new Error("Method 'getStrength()' must be implemented.");
    }

    getType() {
        return "shield";
    }
}

module.exports = BaseServerItemShield;
