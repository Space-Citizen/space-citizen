
class BaseItem extends BaseEntity {
  onInit() {

  }

  getHitCircle() {
    return 0;
  }

  getPriority() {
    return priority.ITEMS;
  }
}
