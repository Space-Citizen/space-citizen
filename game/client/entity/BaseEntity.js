class BaseEntity {

  constructor(server_entity, manager) {
    this.manager = manager;
    this.onServerUpdate(server_entity);
    this.onInit();
  }

  onServerUpdate(server_entity) {
    update_dict(this, server_entity);
    this.pos = this.s_pos;
    this.type = this.s_type;
  }

  onInit() {
    throw new Error("Method 'onInit()' must be implemented.");
  }

  onUpdate(timeElapsed) {
    throw new Error("Method 'onUpdate(timeElapsed)' must be implemented.");
  }
}