
class Client {
  constructor() {
    this.world = new World();
    this.socket = io.connect(SERVER);
    this.gameLoop = new GameLoop(this.onUpdate.bind(this), FRAMERATE);
  }

  displayEntity(entity) {
    context.beginPath();
    context.arc(entity.pos.x, entity.pos.y, 50, 0, 2 * Math.PI);
    context.stroke();
  }

  displayWorld() {
    var index;
    for (index = 0; index < this.world.entities.length; index++) {
      var entity = this.world.entities[index];
      this.displayEntity(entity);
      console.log(entity.pos);
    }
  }

  onUpdate(timeElapsed) {
    canvasClear();
    this.displayWorld();
  }

  start() {
    var that = this;
    this.socket.on('connect', function () {
      //socket.emit('join', 'Hello World from client');
      console.log("connected");
    });

    this.socket.on("message", function (message) {
      console.log(message);
    });

    this.socket.on("world_update", function (new_world) {
      console.log("got new world");
      that.world = new_world;
    });

    this.gameLoop.start();
  }
}

var client = new Client();
client.start();
