
module.exports = {
    getUserFromId(id) {
        return (users.find(function (user) { return (user.id === id) }));
    },

    getUserFromToken(token) {
        return (users.find(function (user) { return (user.token === token) }));
    },

    getUserFromSocket(socket) {
        return (users.find(function (user) {
            if (!user.socket)
                return (false);
            return (user.socket.id === socket.id);
        }));
    }
}
