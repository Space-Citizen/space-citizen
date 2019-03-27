
var BaseServerItem = require("./BaseServerItem")

class BaseServerItemShield extends BaseServerItem {

    onInit() {
        this.ship.c_max_shield += this.getStrength();
        this.ship.shield_regen += this.getRegen();
        this.ship.s_shield += this.getStrength();
    }

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
