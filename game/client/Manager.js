
class Manager {
  constructor() {
    this.gameLoop = new GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
    this.state = new StateLoading();
    this.state.init(this);
  }

  start() {
    this.gameLoop.start();
  }

  onUpdate(timeElapsed) {
    if (window.innerHeight * Constants.SCREEN_RATIO > window.innerWidth) {
      // if height > width
      canvas.width = window.innerWidth;
      canvas.height = canvas.width / Constants.SCREEN_RATIO;
    } else {
      canvas.height = window.innerHeight;
      canvas.width = canvas.height * Constants.SCREEN_RATIO;
    }

    canvasClear();
    var rep = this.state.onUpdate(timeElapsed);
    if (rep) {
      this.state.onDestroy();
      this.state = rep;
      this.state.init(this);
    }
  }
}
