
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
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvasClear();
    var rep = this.state.onUpdate(timeElapsed);
    if (rep) {
      this.state.onDestroy();
      this.state = rep;
      this.state.init(this);
    }
  }
}
