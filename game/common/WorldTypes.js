
var WorldTypes = {
    "EARTH": 1,
    "MARS": 2,
    "SPACE": 3,
    "NEBULA": 4
}
Object.freeze(WorldTypes);

if (typeof module != 'undefined') {
    module.exports = WorldTypes;
}
