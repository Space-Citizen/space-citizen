class ClientEntity extends Entity {
  constructor(id, x, y) {
    super(id, x, y);
    this.image = new Image();
    this.image.src = "../common/res/spaceship1.png";
  }
}