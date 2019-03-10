
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createEntity(server_entity, game) {
    var EntityClasses = {
        "player": EntityPlayer,
        "stargate": EntityStargate,
        "background": EntityBackground,
        "missile": EntityMissile,
        "hatak": EntityHatak,
    }
    var res = new EntityClasses[server_entity.s_type](server_entity, game);
    return res;
}

function createShip(ship_type) {
    console.log(ship_type);
    var ShipClasses = {
        "BC304": BC304,
        "ONeill": ONeill,
        "Hatak": Hatak,
    }
    var res = new (ShipClasses[ship_type])();
    return res;
}

function convertSizeToScreen(size) {
    // convert size (in meters) to screen size
    return canvas.width * (size / Constants.X_VIEW_RANGE);
}

function percentWidthToScreen(size) {
    // convert size percent to screen size
    return canvas.width * (size / 100);
}

function percentHeightToScreen(size) {
    // convert size percent to screen size
    return canvas.height * (size / 100);
}

function convertScreenPercentToWorldSize(size) {
    return percentWidthToScreen(size) / canvas.width * Constants.X_VIEW_RANGE
}

function isOutsideMap(world_pos) {
    if (world_pos.x < 0 || world_pos.x > Constants.WORLD_SIZE_X
        || world_pos.y < 0 || world_pos.y > Constants.WORLD_SIZE_Y) {
        return (true);
    }
    return (false);
}


function drawHealthBar(x, y, size, hp_percent) {
    var x_size = convertSizeToScreen(size);
    var y_size = x_size / 30;

    var x = x - x_size / 2;
    var y = y - y_size / 2;

    context.beginPath();
    context.fillStyle = "grey"
    context.fillRect(x, y, x_size, y_size);
    context.stroke();

    context.beginPath();
    context.fillStyle = "green"
    context.fillRect(x, y, x_size * hp_percent / 100, y_size);
    context.stroke();
}