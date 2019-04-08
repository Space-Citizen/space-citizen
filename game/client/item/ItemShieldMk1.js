
class ItemShieldMk1 extends BaseItem {
  constructor(entity_ship) {
    super(entity_ship);
    // later on we could define shield display functions here
  }

  getType() {
    return "shield";
  }
}
