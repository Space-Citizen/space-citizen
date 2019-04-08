
class BaseItem {
  constructor(entity_ship) {
    this.ship = entity_ship;
  }

  getType() {
    throw new Error("Method 'getType()' must be implemented.");
  }
}
