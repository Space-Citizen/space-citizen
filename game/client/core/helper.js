
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateDict(dest, src) {
    for (key in src) {
        dest[key] = src[key]
    }
    return dest;
}

function createEntity(server_entity, game) {
    var EntityClasses = {
        "player": EntityPlayer,
        "stargate": EntityStargate,
        "background": EntityBackground
    }
    var res = new EntityClasses[server_entity.s_type](server_entity, game);
    return res;
}

function convertSizeToScreen(size) {
    // convert size (in meters) to screen size
    return canvas.width * (size / Constants.X_VIEW_RANGE);
}
