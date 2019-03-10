var { doQuery } = require('../../database/');
var waterfall = require('async-waterfall');
var { increaseBalance } = require('../../balanceFunctions');

function getShipPrice(shipId, userId, waterfallNext) {
    doQuery("SELECT items.`price` FROM `ships` INNER JOIN `items` ON ships.`type` = items.`id`\
WHERE ships.`id` = ? AND ships.`owner` = ?", [shipId, userId]).then(function (itemInfo) {
        if (itemInfo.length === 0) {
            waterfallNext("Ship not found");
            return;
        }
        //get first element in array
        const price = itemInfo[0].price;
        // call next function
        waterfallNext(null, price);
    }, function (error) { waterfallNext(error) });
}

function deleteShipFromInventory(shipId, waterfallNext) {
    doQuery("DELETE FROM `ships` WHERE `id` = ?", [shipId]).then(function (deleteResult) {
        if (deleteResult.affectedRows === 0) {
            waterfallNext("An error occured while selling your ship");
            return;
        }
        waterfallNext(null);
    }, function (error) { waterfallNext(error) });
}

function moveShipItemsToInventory(shipId, userId, waterfallNext) {
    doQuery("UPDATE `inventory` SET `used_on_ship` = NULL WHERE `owner` = ? AND `used_on_ship` = ?",
        [userId, shipId]).then(function (result) {
            waterfallNext(null);
        }, function (error) {
            waterfallNext(error);
        });
}

//get item info
module.exports = function (req, res, next, userId) {
    // check paramters
    if (!req.params.shipId) {
        res.status(400).json({ error: "Missing paramters" });
        return;
    }

    var shipPrice;
    waterfall([
        function (waterfallNext) {
            moveShipItemsToInventory(req.params.shipId, userId, waterfallNext);
        },
        function (waterfallNext) {
            // get the price of the ship
            getShipPrice(req.params.shipId, userId, waterfallNext);
        },
        function (price, waterfallNext) {
            shipPrice = price;
            // delete the item from the inventory
            deleteShipFromInventory(req.params.shipId, waterfallNext);
        },
        function (waterfallNext) {
            // update the user's balance
            // increase the balance by half the price of the item
            increaseBalance(userId, (shipPrice / 2)).then((result) => {
                waterfallNext(null, "Ship sold for " + shipPrice / 2);
            }).catch((error) => { waterfallNext(error) })
        }
    ], function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error });
            return;
        }
        res.status(200).json({ success: result });
    });
}