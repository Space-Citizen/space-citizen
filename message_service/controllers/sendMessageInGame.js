const { getUserFromToken } = require('./findUser')

module.exports = function (data) {
    const userSending = getUserFromToken(data.token);

    users.forEach((user) => {
        user.socket.emit("message:receive:ingame", { sender_username: userSending.username, content: data.message });
    });
}