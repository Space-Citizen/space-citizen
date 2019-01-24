
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var objects = require('../common');
var Constants = objects.Constants;

var WorldManager = require('./WorldManager');

class Server {
  constructor() {
    //app.set('port', port);
    app.use('/', express.static(__dirname + '/../client'));
    app.use('/common', express.static(__dirname + '/../common'));
    app.use('/res', express.static(__dirname + '/../res'));

    server.listen(Constants.PORT, function () {
      console.log('Starting server on port ' + Constants.PORT);
    });
    this.world = new WorldManager(this);
    io.on('connection', this.eventConnection.bind(this));
  }

  eventConnection(client) {
    this.world.spawnPlayer(client);
  }

  onUpdate(timeElapsed) {
    this.world.onUpdate(timeElapsed);
  }
  start() {
    var gameLoop = new objects.GameLoop(this.onUpdate.bind(this), Constants.FRAMERATE);
    gameLoop.start();
  }
}

var server = new Server();
server.start();
