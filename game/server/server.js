
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var objects = require('../common');
var Constants = objects.Constants;

var World = require('./World');
var Entity = require('./entity');

class Server {
  constructor() {
    this.running = false;
    this.worlds = {}
    //app.set('port', port);
    app.use('/', express.static(__dirname + '/../client'));
    app.use('/common', express.static(__dirname + '/../common'));
    app.use('/res', express.static(__dirname + '/../res'));

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

  eventConnection(client) {
    var player = new Entity.ServerEntityPlayer(this.worlds.earth, 0, 0, client);
  }

  onUpdate(timeElapsed) {
    for (var key in this.worlds) {
      var world = this.worlds[key];
      world.onUpdate(timeElapsed);
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      var gameLoop = new objects.GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
      gameLoop.start();
    }
  }
}

var server = new Server();
server.start();
