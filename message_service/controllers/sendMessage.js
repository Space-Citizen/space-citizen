const request = require('request');
const { getUserFromToken, getUserFromId } = require('./findUser')

module.exports = function (data) {
    var user = getUserFromToken(data.token);
    var receiver = getUserFromId(data.data.receiver);

    if (!user) {
        console.log("sender not found");
        return;
    }

    request.post({
        url: process.env.SPACE_CITIZEN_API_URL + '/api/messages/send',
        form: {
            receiver: data.data.receiver,
            content: data.data.message
        },
        headers: { "x-access-token": data.token }
    }, function (error, response) {
        var responseParsed = undefined;
        if (response.body)
            responseParsed = JSON.parse(response.body);
        if (error || !responseParsed || responseParsed.error) {
            user.socket.emit("message:send:response", "An error occured");
            return;
        }
        else
            user.socket.emit("message:send:response", { sender_id: user.id, receiver: data.data.receiver, content: data.data.message, id: responseParsed.insertId });
        if (receiver && receiver.socket) {
            // send message to receiver's socket
            receiver.socket.emit("message:receive", { sender_id: user.id, content: data.data.message });
        }
    });
}
