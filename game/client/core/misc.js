
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createEntity(server_entity, game) {
    var EntityClasses = {
        "player": EntityPlayer,
        "stargate": EntityStargate,
        "background": EntityBackground,
        "missile": EntityMissile,
    }
    var res = new EntityClasses[server_entity.s_type](server_entity, game);
    return res;
}

function createShip(ship_type) {
    console.log(ship_type);
    var ShipClasses = {
        "BC304": BC304,
        "ONeill": ONeill,
    }
    var res = new (ShipClasses[ship_type])();
    return res;
}

function convertSizeToScreen(size) {
    // convert size (in meters) to screen size
    return canvas.width * (size / Constants.X_VIEW_RANGE);
}

function convertPercentToScreen(size) {
    // convert size percent to screen size
    return canvas.width * (size / 100)
}

function convertScreenPercentToWorldSize(size) {
    return Constants.WORLD_SIZE_X / Constants.X_VIEW_RANGE * size;
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