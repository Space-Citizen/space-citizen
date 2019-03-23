
class Manager {
  constructor() {
    this.game_loop = new GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
    this.state = new StateLoading();
    this.state.init(this);
  }


  start() {
    this.game_loop.start();
  }

  onUpdate(time_elapsed) {

    if (Helper.onInterval(this, "screen_size", 0.3)) {
      // TODO optimize
      if (window.innerHeight * Constants.SCREEN_RATIO > window.innerWidth) {
        // if height > width
        canvas.width = window.innerWidth;
        canvas.height = canvas.width / Constants.SCREEN_RATIO;
      } else {
        canvas.height = window.innerHeight;
        canvas.width = canvas.height * Constants.SCREEN_RATIO;
      }
    }

    canvasClear();
    var rep = this.state.onUpdate(time_elapsed);
    if (rep) {
      this.state.onDestroy();
      this.state = rep;
      this.state.init(this);
    }
  }
}
