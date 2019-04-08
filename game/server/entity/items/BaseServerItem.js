

var BaseServerEntity = require("../BaseServerEntity");

class BaseServerItem extends BaseServerEntity {
  constructor(entity_ship) {
    super(entity_ship.world, 0, 0, entity_ship.world.getFreeId());
  }

  isItem() {
    return true;
  }
}

module.exports = BaseServerItem;
