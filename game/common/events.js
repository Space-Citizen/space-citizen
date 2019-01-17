
var Events = {
    "CONNECT": 'connect',
    "UPDATE_ENTITIES": 1,
};

Object.freeze(Events);
  
if (typeof module != 'undefined') {
    module.exports = {
        default: Events
    };
}
  
  