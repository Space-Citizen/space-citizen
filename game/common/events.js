
var Events = {
    "CONNECT": 'connect', // socket
    "DISCONNECT": "disconnect", // void

    // server >> client
    "SERVER_UPDATE_ENTITIES": 1, // list[Entity]
    "SERVER_DELETE_ENTITY": 2, // int
    "SERVER_RESET_MAP": 3, // void

    // client >> server
    "PLAYER_AUTH": 5, // Authenticate the player
    "PLAYER_CALL_FUNCTION": 6, // function name, args as list
};

Object.freeze(Events);

if (typeof module != 'undefined') {
    module.exports = Events;
}
