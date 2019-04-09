const { sendMessage, sendMessageInGame } = require('./controllers');
const User = require('./classes/User');
const request = require('request');
const port = 4001;
var io = require('socket.io').listen(port);

global.users = [];

console.log("Starting server on port " + port);

io.sockets.on('connection', function (socket) {
    console.log('client connected');

    socket.on('message:authenticate', function (data) {
        request.get({
            url: process.env.SPACE_CITIZEN_API_URL + '/api/users/private_info',
            headers: { "x-access-token": data.token }
        }, function (error, response) {
            var user_info = undefined;

            if (response)
                user_info = JSON.parse(response.body);

            // if authentication fail, abort
            if (error || !user_info || user_info.error) {
                return;
            }
            // create the user
            console.log(user_info.username + " authenticated");
            users.push(new User(user_info, socket, data.token));
        });
    });

    socket.on('message:send', sendMessage.bind(this));

    // Send message in game
    socket.on('message:send:ingame', sendMessageInGame.bind(this));

    // delete client
    socket.on('disconnect', function () {
        var userIndex = users.findIndex(function (e) { if (!e.socket) { return (false); } return (e.socket.id == socket.id) });

        if (userIndex >= 0) {
            console.log("Client disconnected: ", users[userIndex].username)
            users.splice(userIndex, 1);
        }
        else
            console.log("WARNING: Message_service, Unable to find user on disconnect");
    });
});
