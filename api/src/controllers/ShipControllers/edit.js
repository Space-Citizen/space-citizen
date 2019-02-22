var waterfall = require('async-waterfall');
var { doQuery, mysqlError } = require('../../database/');

function moveItemsToShip(itemList, userId, shipId, waterfallNext) {
    if (itemList.length === 0) {
        waterfallNext(null);
        return;
    }

    const itemsId = itemList.map(function (e) { return e.id; });
    doQuery("UPDATE `inventory` SET `used_on_ship` = ? WHERE `id` IN (?) AND `owner` = ?",
        [shipId, itemsId, userId]).then(function (result) {
            waterfallNext(null);
        }, function (error) {
            waterfallNext(error);
        });
}

function moveItemsToInventory(itemList, userId, waterfallNext) {
    if (itemList.length === 0) {
        waterfallNext(null);
        return;
    }

    const itemsId = itemList.map(function (e) { return e.id; });
    doQuery("UPDATE `inventory` SET `used_on_ship` = NULL WHERE `id` IN (?) AND `owner` = ?",
        [itemsId, userId]).then(function (result) {
            waterfallNext(null);
        }, function (error) {
            waterfallNext(error);
        });
}

// edit ship's inventory
module.exports = function (req, res, next, userId) {
    if (!req.body || !req.body.shipId || (!req.body.itemsToShip && !req.body.itemsToInventory)) {
        res.status(400).json({ error: "Missing parameters" });
        return;
    }

    if (req.body.itemsToShip.length === 0 && req.body.itemsToInventory.length === 0) {
        res.status(200).json({ success: "No item needed to be moved" });
        return;
    }

    waterfall([
        function (waterfallNext) {
            moveItemsToInventory(req.body.itemsToInventory, userId, waterfallNext);
        },
        function (waterfallNext) {
            moveItemsToShip(req.body.itemsToShip, userId, req.body.shipId, waterfallNext);
        }],
        function (error, result) {
            if (error) {
                mysqlError(error);
                return;
            }
            res.status(200).json({ success: "Item(s) moved" });
        });
}
