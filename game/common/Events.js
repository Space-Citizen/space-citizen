
var Events = {
    CONNECT: 'connect', // socket
    DISCONNECT: "disconnect", // void
    CONNECTION: "connection",

    // server >> client
    SERVER_NEW_ENTITY: 0,
    SERVER_UPDATE_ENTITIES: 1, // list[Entity]
    SERVER_DELETE_ENTITY: 2, // int
    SERVER_KILL_ENTITY: 3, // int
    SERVER_RESET_MAP: 4, // void
    SERVER_CALL_FUNCTION: 5,// entity id, function name, args as list
    SERVER_PONG: 6,

    // client >> server
    PLAYER_AUTH: 8, // Authenticate the player
    PLAYER_CALL_FUNCTION: 9, // function name, args as list
    PLAYER_PING: 10,
};

Object.freeze(Events);

if (typeof module != 'undefined') {
    module.exports = Events;
}
