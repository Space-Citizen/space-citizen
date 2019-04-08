

var BaseServerEntity = require("../BaseServerEntity");

class BaseServerItem extends BaseServerEntity {
  constructor(entity_ship) {
    super(entity_ship.world, 0, 0, entity_ship.world.getFreeId());
    entity_ship.addChild(this);
  }

  isItem() {
    return true;
  }
}

module.exports = BaseServerItem;
