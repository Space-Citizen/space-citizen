
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var objects = require('../common');
var Constants = objects.Constants;
var Events = require('../common/Events');
var Helper = require('../common/Helper');

var World = require('./world');
var Entity = require('./entity');
var Ship = require('./ship');

// API link
const api = require('./api');

// Reset online status for all players to 0
api.resetOnlineStatus().catch(error => console.log(error));

class Client {
  constructor(server, socket) {
    this.id = socket.id;
    this.server = server;
    this.socket = socket;
    this.user_id = null;
    this.socket.on(Events.DISCONNECT, this.eventDisconnect.bind(this));
    this.socket.on(Events.PLAYER_AUTH, this.eventPlayerAuth.bind(this));
  }

  spawnTestShip() {
    var ip = this.socket.request.connection.remoteAddress;
    var user_info = {
      id: ip,
      username: "tester",
      ship_type: ip.endsWith("192.168.1.25") ? "ONeill" : "BC304",
      map: "earth",
      map_coordinate_x: Constants.WORLD_SIZE_X / 2,
      map_coordinate_y: Constants.WORLD_SIZE_Y / 2,
      user_id: "tester",
      token: "abc"
    };
    this.server.spawnPlayer(this.socket, user_info);
  }

  eventPlayerAuth(token) {
    if (token === "test") {
      this.spawnTestShip();
      return;
    }
    // get the user's information from the api
    api.getUserInfo(token).then((user_info_response) => {
      var user_info = JSON.parse(user_info_response);
      user_info.token = token;
      api.getUserShip(token).then((ship) => {
        user_info.ship_type = JSON.parse(ship).name;
        if (this.server.spawnPlayer(this.socket, user_info)) {
          api.changeUserOnlineStatus(user_info.id, 1);
        }
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  eventDisconnect() {
    var player = this.server.getPlayerById(this.id);
    if (player != null) {
      // Tell where player disconnected
      api.setUserPos(
        player.user_id, player.world.getWorldName(), player.s_pos
      ).catch(error => {
        console.log(error)
      });
      // Change user's status to offline
      api.changeUserOnlineStatus(
        player.user_id, 0
      ).catch(error => {
        console.log(error)
      });
    }
    this.server.deleteClient(this);
  }
}

class Server {
  constructor() {
    this.running = false;
    this.worlds = {};
    this.clients = {};
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

  addClient(client) {
    this.clients[client.id] = client;
  }

  deleteClient(client) {
    delete this.clients[client.id];
  }

  runOnWorlds(func) {
    for (var key in this.worlds) {
      var world = this.worlds[key];
      func(world);
    }
  }

  runOnPlayers(func) {
    this.runOnWorlds(function (world) {
      world.runOnPlayers(func);
    });
  }

  getPlayerById(id) {
    var res = null;
    this.runOnPlayers(function (player) {
      if (player.id === id) {
        res = player;
      }
    });
    return res;
  }

  playerExists(user_id) {
    var exists = false;
    this.runOnPlayers(function (player) {
      if (player.user_id === user_id) {
        exists = true;
      }
    });
    return exists;
  }

  spawnPlayer(socket, user_info) {
    var world = this.worlds[user_info.map];
    if (!world) {
      console.log("Invalid world : " + user_info.map);
      return;
    }
    // Check if the player is already playing. If so, leave
    if (this.playerExists(user_info.id))
      return;
    var name = user_info.username;
    var pos_x = user_info.map_coordinate_x;
    var pos_y = user_info.map_coordinate_y;
    const NewShip = Ship[user_info.ship_type];
    if (!NewShip) {
      console.log("This ship type does not exist: " + user_info.ship_type);
      return;
    }
    var ship = new NewShip();
    var entity = new Entity.ServerEntityPlayer(
      world,
      pos_x, pos_y,
      socket, name, ship,
      user_info.token, user_info.faction, user_info.id
    );
    return entity;
  }

  eventConnection(socket) {
    var client = new Client(this, socket);
    this.addClient(client);
  }

  onUpdate(time_elapsed) {
    this.runOnWorlds(function (world) {
      world.onUpdate(time_elapsed);
    });
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
