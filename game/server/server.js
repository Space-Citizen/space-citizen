
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var objects = require('../common');
var Constants = objects.Constants;
var Events = require('../common/Events');

var World = require('./world');
var Entity = require('./entity');
var Ship = require('./ship');

// API link
const api = require('./api');

class Server {
  constructor() {
    this.running = false;
    this.worlds = {}
    //app.set('port', port);
    app.use('/game/', express.static(__dirname + '/../client'));
    app.use('/game/common', express.static(__dirname + '/../common'));
    app.use('/game/res', express.static(__dirname + '/../res'));

    server.listen(Constants.PORT, function () {
      console.log('Starting server on port ' + Constants.PORT);
    });

    this.addWorld(new World.WorldEarth(this));
    this.addWorld(new World.WorldMars(this));
    io.on('connection', this.eventConnection.bind(this));
  }

  addWorld(world) {
    this.worlds[world.getWorldName()] = world;
  }

  spawnPlayer(client, user_info) {
    var world = this.worlds[user_info.map];
    if (!world) {
      console.log("Invalid world : " + user_info.map);
      return;
    }
    var name = user_info.username;
    var pos_x = user_info.map_coordinate_x;
    var pos_y = user_info.map_coordinate_y;

    const NewShip = Ship.ship_list[user_info.ship_type];
    if (!NewShip) {
      console.log("This ship type does not exist: " + user_info.ship_type);
      return;
    }
    var ship = new NewShip();
    return new Entity.ServerEntityPlayer(world, pos_x, pos_y, client, name, ship, user_info.token);
  }

  eventConnection(client) {
    var that = this;
    client.on(Events.PLAYER_AUTH, function (token) {

      //////// TO REMOVE FOR PROD ////////
      if (token === "test") {
        var ip = client.request.connection.remoteAddress;
        var user_info = {
          id: 1,
          username: "tester",
          ship_type: ip.endsWith("192.168.1.25") ? "ONeill" : "BC304",
          map: "earth",
          map_coordinate_x: 0,
          map_coordinate_y: 0
        };
        that.spawnPlayer(client, user_info);
        return;
      }
      ///////////////////////////////////

      // get the user's information from the api
      api.getUserInfo(token).then((user_info_response) => {
        const user_info = JSON.parse(user_info_response);
        api.getUserShip(token).then((ship) => {
          user_info.ship_type = JSON.parse(ship).name;
          user_info.token = token;
          that.spawnPlayer(client, user_info);
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  onUpdate(time_elapsed) {
    for (var key in this.worlds) {
      var world = this.worlds[key];
      world.onUpdate(time_elapsed);
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      var game_loop = new objects.GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
      game_loop.start();
    }
  }
}

var server = new Server();
server.start();
