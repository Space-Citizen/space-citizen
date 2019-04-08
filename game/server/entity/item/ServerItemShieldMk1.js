

var BaseServerItem = require("./BaseServerItem");

class ServerItemShieldMk1 extends BaseServerItem {
  constructor(entity_ship) {
    super(entity_ship);
    this.onInit();
  }

  onUpdate(time_elasped) {

    //console.log(this.world.getWorldName());
  }

  getType() {
    return "shield_mk1";
  }

}

module.exports = ServerItemShieldMk1;
