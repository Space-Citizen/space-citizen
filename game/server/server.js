
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

//app.set('port', port);
app.use('/', express.static(__dirname + '/../client'));
app.use('/common', express.static(__dirname + '/../common'));
app.use('/res', express.static(__dirname + '/../res'));

server.listen(Constants.PORT, function () {
  console.log('Starting server on port ' + Constants.PORT);
});

var world_manager = new WorldManager();

io.on('connection', function (client) {
  // TODO event like system
  world_manager.spawnPlayer(client);
});

var gameLoop = new objects.GameLoop(
  function (timeElapsed) {
    world_manager.onUpdate(timeElapsed)
    //io.emit("world_update", world_manager.world);
  }, Constants.FRAMERATE);

gameLoop.start();
