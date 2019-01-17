var port = 5000
var framerate = 30;

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var core = require('./common/core');
var world = new core.World();
console.log(world.width);

var app = express();
var server = http.Server(app);
var io = socketIO(server);

//app.set('port', port);
app.use('/', express.static(__dirname + '/client'));
app.use('/common', express.static(__dirname + '/common'));


server.listen(port, function () {
  console.log('Starting server on port ' + port);
});

io.on('connection', function (client) {
  client.emit("message", "hello " + client.id);
  world.addEntity(new core.Entity(client.id));
  client.on("disconnect", function () {
    console.log("client disconnected");
    world.removeEntity(client.id);
  });
});

var gameLoop = new core.GameLoop(
  function (timeElapsed) {
    io.emit("world_update", world);
  }, framerate);

gameLoop.start();
