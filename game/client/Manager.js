
class Manager {
  constructor() {
    this.game_loop = new GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
    this.state = new StateLoading();
    this.state.init(this);
    this.uis = null;
    this.initUis();
  }

  initUis() {
    this.uis = {};
  }

  addUi(name, ui) {
    this.uis[name] = ui;
    return ui;
  }

  updateUis(time_elapsed) {
    this.runOnUis(function (ui) {
      ui.onUpdate(time_elapsed);
    });
  }

  runOnUis(func) {
    var uis = this.uis;
    for (var key in uis) {
      if (uis.hasOwnProperty(key)) {
        var ui = uis[key];
        if (func(ui)) {
          // if func is return true, dont call other Uis
          return;
        }
      }
    }
  }

  start() {
    this.game_loop.start();
  }

  onUpdate(time_elapsed) {

    // TODO optimize
    if (window.innerHeight * Constants.SCREEN_RATIO > window.innerWidth) {
      // if height > width
      canvas.width = window.innerWidth;
      canvas.height = canvas.width / Constants.SCREEN_RATIO;
    } else {
      canvas.height = window.innerHeight;
      canvas.width = canvas.height * Constants.SCREEN_RATIO;
    }

    canvasClear();
    var rep = this.state.onUpdate(time_elapsed);
    if (rep) {
      this.state.onDestroy();
      this.initUis();
      this.state = rep;
      this.state.init(this);
    }
    this.updateUis(time_elapsed);
    if (mouse.left_click) {
      this.runOnUis(function (ui) {
        ui.onMouseLeftClick();
      });
    }
    if (mouse.right_click) {
      this.runOnUis(function (ui) {
        ui.onMouseRightClick();
      });
    }
  }
}
