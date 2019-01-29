class BaseEntity {

  constructor(server_entity, manager, pos_smooth = 5, bearing_smooth = 10) {
    this.manager = manager;
    this._pos_smooth = pos_smooth;
    this._bearing_smooth = bearing_smooth;
    this.onServerUpdate(server_entity);
    this.onInit();
    this.pos = this.s_pos;
    this.bearing = this.s_bearing;
    this.type = this.s_type;
  }

  onServerUpdate(server_entity) {
    updateDict(this, server_entity);
  }

  onInit() {
    throw new Error("Method 'onInit()' must be implemented.");
  }

  getHitCircle() {
    // just like hit box, but its a circle
    // it will be used for mouse targeting
    throw new Error("Method 'hitCircle()' must be implemented.");
  }

  getPriority() {
    // higher the priority, sooner it will be displayed
    throw new Error("Method 'getPriority()' must be implemented.");
  }

  onUpdate(time_elapsed) {
    var dir_x = (this.s_pos.x - this.pos.x);
    var dir_y = (this.s_pos.y - this.pos.y);
    this.pos.x += dir_x * Math.min(this._pos_smooth * time_elapsed, 1);
    this.pos.y += dir_y * Math.min(this._pos_smooth * time_elapsed, 1);

    //var bearing_diff = (this.s_bearing - this.bearing);
    // TODO: smooth bearing
    this.bearing = this.s_bearing;
    // TODO: _onUpdate ?
  }

  onDestroy() {
    throw new Error("Method 'onDestroy()' must be implemented.");
  }
}