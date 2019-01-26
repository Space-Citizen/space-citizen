
var Events = {
    "CONNECT": 'connect', // socket
    "DISCONNECT": "disconnect", // void
    // server >> client
    "SERVER_UPDATE_ENTITIES": 1, // list[Entity]
    "SERVER_DELETE_ENTITY": 2, // int
    "SERVER_RESET_MAP": 3, // void
    // client >> server
    "PLAYER_MOVE_TO": 4, // Position
};

Object.freeze(Events);

if (typeof module != 'undefined') {
    module.exports = Events;
}
