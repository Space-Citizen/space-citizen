class BaseEntity {

  constructor(server_entity, game, pos_smooth = 5) {
    this.game = game;
    this._pos_smooth = pos_smooth;
    this._audios = [];
    this.onServerUpdate(server_entity);
    this.onInit();
    this.pos = this.s_pos;
    this.type = this.s_type;
    this.game.addEntity(this);
  }

  onServerUpdate(server_entity) {
    Helper.updateDict(this, server_entity);
  }

  getAudio(audio) {
    var res = audio.cloneNode();
    this._audios.push(res);
    return res;
  }

  _updateAudios() {
    // update audio volumes
    var dist = Helper.dist(this.pos, this.game.self.pos);

    for (var x = 0; x < this._audios.length; x += 1) {
      var audio = this._audios[x];
      if (dist > 100) {
        audio.volume = 0;
      } else {
        audio.volume = Helper.map(dist, 0, 100, 1, 0);
      }
      console.log("volume: " + audio.volume);
    }
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
    // TODO: _onUpdate ?
    this._updateAudios();
  }

  delete() {
    this.game.deleteEntity(this.id);
  }

  kill() {
    this.delete();
  }
}