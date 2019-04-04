class BaseEntity {

  constructor(server_entity, game) {
    this.game = game;
    this._audios = [];
    this.onServerUpdate(server_entity);
    this.onInit();
    this.pos = this.s_pos;
    this.type = this.s_type;
    this.game.addEntity(this);
    this.killed = false; // var set in listener >> StateGame
  }

  isAlive() {
    if (this.killed) {
      return false;
    }
    return true;
  }

  onServerUpdate(server_entity) {
    Helper.updateDict(this, server_entity);
  }

  getAudio(audio) {
    var res = audio.clone();
    this._audios.push(res);
    return res;
  }

  _updateAudios() {
    // update audio volumes
    if (Helper.onInterval(this, "updateAudio", 0.2)) {
      var dist = Helper.dist(this.pos, this.game.self.pos);

      for (var x = 0; x < this._audios.length; x += 1) {
        var audio = this._audios[x];
        if (dist > Constants.SOUND_RANGE) {
          audio.setVolume(0);
        } else {
          audio.setVolume(Helper.map(dist, 0, Constants.SOUND_RANGE, 0.3, 0));
        }
        //console.log("volume: " + audio._audio.volume);
      }
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

    var ping_ms = this.average_ping_ms;
    if (!ping_ms || ping_ms < 50) {
      // Actually we dont want the entity to teleport when pings gets low
      ping_ms = 50;
    }
    if (ping_ms > 300) {
      // We also dont want the entity to stop when ping gets too high
      ping_ms = 300;
    }
    var time_elapsed_ms = time_elapsed * 1000;
    var multiplier = ((1 / ping_ms) * (1 / time_elapsed_ms)) * 1000;
    multiplier /= 2;
    var dir_x = (this.s_pos.x - this.pos.x);
    var dir_y = (this.s_pos.y - this.pos.y);
    this.pos.x += dir_x * Math.min(multiplier, 1);
    this.pos.y += dir_y * Math.min(multiplier, 1);

    //var bearing_diff = (this.s_bearing - this.bearing);
    // TODO: smooth bearing
    // TODO: _onUpdate ?
    if (Helper.onInterval(this, "updateAudio", 0.1) && 0) {
      this._updateAudios();
    }
  }

  delete() {
    this.game.deleteEntity(this.id);
  }

  kill() {
    this.delete();
  }
}