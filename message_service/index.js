const { sendMessage } = require('./controllers');
const User = require('./classes/User');
const request = require('request');
const port = 4001;
var ca, certificate, privateKey;
try {
    privateKey = fs.readFileSync('/etc/letsencrypt/live/space-citizen.cf/privkey.pem').toString();
    certificate = fs.readFileSync('/etc/letsencrypt/live/space-citizen.cf/cert.pem').toString();
    ca = fs.readFileSync('/etc/letsencrypt/live/space-citizen.cf/chain.pem').toString();
}
catch (e) {
    console.log("Failed to load ssl keys");
}

var io = require('socket.io').listen(port, { key: privateKey, cert: certificate, ca: ca });

global.users = [];

console.log("Starting server on port " + port);

io.sockets.on('connection', function (socket) {
    console.log('client connected');

    socket.on('message:authenticate', function (data) {
        request.get({
            url: process.env.SPACE_CITIZEN_API_URL + '/api/me/info',
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
            users.push(new User(user_info, socket, data.token));
        });
    });

    socket.on('message:send', sendMessage.bind(this));

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
