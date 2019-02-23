
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
const request = require('request');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var objects = require('../common');
var Constants = objects.Constants;
var Events = require('../common/Events');

var World = require('./world');
var Entity = require('./entity');

class Server {
  constructor() {
    this.running = false;
    this.worlds = {}
    //app.set('port', port);
    app.use('/game/', express.static(__dirname + '/../client'));
    app.use('/static/game/common', express.static(__dirname + '/../common'));
    app.use('/static/game/res', express.static(__dirname + '/../res'));

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
    var that = this;
    client.on(Events.PLAYER_AUTH, function (token) {

      // get the user's information from the api
      request.get({
        url: process.env.SPACE_CITIZEN_API_URL + '/api/me/info',
        headers: { "x-access-token": token }
      }, function (error, response) {
        var user_info;
        if (response)
          user_info = JSON.parse(response.body);
        // TODO: REMOVE DEBUG CONDITION
        if (token === "test")
          user_info = { username: "tester", id: 1 };
        // if authentication fail, abort
        if ((error && token !== "test") || !user_info || user_info.error) {
          //console.error(user_info.error);
          return;
        }
        // create the player
        new Entity.ServerEntityPlayer(that.worlds.earth, 0, 0, client, user_info);
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
