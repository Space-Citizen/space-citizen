
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function update_dict(a, b){
	for(key in b) {
		a[key] = b[key]
  }
	return a;
}

class Client {
  constructor() {
    this.socket = io.connect(Constants.SERVER);
    this.gameLoop = new GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
    this.entities = {};
    this.background_img = new Image();
    this.background_img.src = "../common/res/static_background.jpg";
  }

  start() {
    this.socket.on(Events.CONNECT, this.eventConnect.bind(this));
    this.socket.on(Events.UPDATE_ENTITIES, this.eventUpdateEntities.bind(this));
    this.gameLoop.start();
  }

  eventConnect() {
    this.id = this.socket.io.engine.id;
    console.log("connected as " + this.id);
  }

  eventUpdateEntities(entities_info) {
    //async >> await sleep(1000);
    for (var x in entities_info) {
      var player_info = entities_info[x];
      if (!(player_info.id in this.entities)) {
        this.entities[player_info.id] = new ClientEntity(player_info.id, player_info.pos.x, player_info.pos.y);
        console.log("Spawn:" + player_info);
      }
      update_dict(this.entities[player_info.id], player_info);
    }
  }

  relPos(pos) {
    // convert world pos to screen pos
    var res = new Position(
      pos.x - this.self.pos.x + canvas.width / 2,
      pos.y - this.self.pos.y + canvas.height / 2
    );
    return res;
  }

  worldPos(pos) {
    // convert screen pos to world
    var res = new Position(
      pos.x + this.self.pos.x - canvas.width / 2,
      pos.y + this.self.pos.y - canvas.height / 2
    );
    return res;
  }

  displayEntity(entity) {
    context.beginPath();
    var screen_pos = this.relPos(entity.pos);
    //context.stroke();
    var img = entity.image;
    context.drawImage(img, screen_pos.x - img.width / 2, screen_pos.y - img.height / 2);
  }

  displayWorld() {
    for (var key in this.entities) {
      if (this.entities.hasOwnProperty(key)) {
        var entity = this.entities[key];
        this.displayEntity(entity);
        //entity.onUpdate(timeElapsed);
      }
    }
  }

  onUpdate(timeElapsed) {
    canvasClear();
    context.drawImage(this.background_img, 0, 0,
      this.background_img.width, this.background_img.height,
        0, 0, canvas.width, canvas.height);
    if (this.id in this.entities) {
      this.self = this.entities[this.id];
      this.displayWorld();
    }
    console.log(mouse.left_click);
    if (mouse.left_click) {
      
      this.socket.emit("mousePos", this.worldPos(mouse));
    }
  }
}

var client = new Client();
client.start();
