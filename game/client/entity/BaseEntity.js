class BaseEntity {

  constructor(server_entity, manager, pos_smooth = 10, bearing_smooth = 10) {
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
    update_dict(this, server_entity);
  }

  onInit() {
    throw new Error("Method 'onInit()' must be implemented.");
  }

  onUpdate(timeElapsed) {
    var dir_x = (this.s_pos.x - this.pos.x);
    var dir_y = (this.s_pos.y - this.pos.y);
    this.pos.x += dir_x * Math.min(this._pos_smooth * timeElapsed, 1);
    this.pos.y += dir_y * Math.min(this._pos_smooth * timeElapsed, 1);


    //var bearing_diff = (this.s_bearing - this.bearing);
    // TODO: smooth bearing
    this.bearing = this.s_bearing;

  }

  onDestroy() {
    throw new Error("Method 'onDestroy()' must be implemented.");
  }
}