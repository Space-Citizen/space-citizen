

var BaseServerItem = require("./BaseServerItem");

class ServerItemShieldMk1 extends BaseServerItem {
  constructor(entity_ship) {
    super(entity_ship);
    this.onInit();
  }

}

module.exports = ServerItemShieldMk1;
