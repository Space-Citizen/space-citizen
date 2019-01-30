var { doQuery, mysqlError } = require('../../database/');

function addItemsToShip(shipId, itemsToShip, userId) {
    if (itemsToShip.length === 0) {
        // no items need to be moved, leave
        return undefined;
    }
    return doQuery("UPDATE `inventory` SET `used_on_ship` = ? WHERE `id` IN (?) AND `owner` = ?",
        [shipId, itemsToShip, userId]);
}

function addItemsToinventory(itemsToInventory, userId) {
    if (itemsToInventory.length === 0) {
        // no items need to be moved, leave
        return undefined;
    }
    return doQuery("UPDATE `inventory` SET `used_on_ship` = NULL WHERE `id` IN (?) AND `owner` = ?",
        [itemsToInventory, userId]);
}

// edit ship's inventory
module.exports = function (req, res, next, userId) {

    if (!req.body || !req.body.shipId || !req.body.itemsToShip || !req.body.itemsToInventory) {
        res.status(200).json({ error: "Missing parameters" });
        return;
    }

    //make an array from parameters
    var itemsToShipId = req.body.itemsToShip.map(function (e) { return e.id; });
    var itemsToInventoryId = req.body.itemsToInventory.map(function (e) { return e.id; });

    if (itemsToShipId.length === 0 && itemsToInventoryId.length === 0) {
        res.status(200).json({ success: "No item needed to be moved" });
        return;
    }
    // add item to ship
    var itemsToShipPromise = addItemsToShip(req.body.shipId, itemsToShipId, userId);
    // add item to inventory
    var itemsToInventoryPromise = addItemsToinventory(itemsToInventoryId, userId);

    if (itemsToShipPromise) {
        itemsToShipPromise.then(function (result) {
            itemsToInventoryPromise.then(function (result) {
                res.status(200).json({ success: "Item(s) moved" });
            }, function (error) { mysqlError(res, error) });
        }, function (error) { mysqlError(res, error) });
    }
    else {
        itemsToInventoryPromise.then(function (result) {
            itemsToShipPromise.then(function (result) {
                res.status(200).json({ success: "Item(s) moved" });
            }, function (error) { mysqlError(res, error) });
        }, function (error) { mysqlError(res, error) });
    }
}
