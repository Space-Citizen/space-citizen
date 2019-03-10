var { doQuery } = require('../../database/');
var { reduceBalance } = require('../../balanceFunctions');
var waterfall = require('async-waterfall');

// get item's informations from the api
function getItemInfo(itemId, waterfallNext) {
    doQuery("SELECT id, price, name, specifications FROM `items` WHERE `id` = ?", [itemId]).then(function (itemInfo) {
        if (itemInfo.length === 0) {
            waterfallNext("Item not found");
            return;
        }
        //get first element in array
        itemInfo = itemInfo[0];
        // call next function
        waterfallNext(null, itemInfo);
    }, function (error) { waterfallNext(error) });
}

function addNewShip(shipInfo, userId) {
    var shipStatus = {
        HP: JSON.parse(shipInfo.specifications).default_hp,
        SPEED: JSON.parse(shipInfo.specifications).default_speed
    }
    return doQuery("INSERT INTO `ships`(type, owner, status) VALUES(?, ?, ?)", [shipInfo.id, userId, JSON.stringify(shipStatus)]);
}

function addItemToInventory(itemInfo, userId) {
    return doQuery("INSERT INTO `inventory`(item_type, owner) VALUES(?, ?)", [itemInfo.id, userId]);
}

//buy an item
module.exports = function (req, res, next, userId) {
    waterfall([
        function (waterfallNext) {
            // get item information
            getItemInfo(req.params.itemId, waterfallNext);
        },
        function (itemInfo, waterfallNext) {
            // change the user's balance
            reduceBalance(userId, itemInfo.price).then((result) => {
                //if item is a ship
                if (JSON.parse(itemInfo.specifications).type === "ship") {
                    // add ship to user ships
                    addNewShip(itemInfo, userId).then(function (result) {
                        waterfallNext(null, { success: itemInfo.name + " added to your hangar" });
                    }, function (error) { waterfallNext(error) });;
                }
                else {
                    // add item to user's inventory
                    addItemToInventory(itemInfo, userId).then(function (result) {
                        waterfallNext(null, { success: itemInfo.name + " added to your inventory" });
                    }, function (error) { waterfallNext(error) });;
                }
            }).catch((error) => { waterfallNext(error) });
        }
    ],
        function (error, result) {
            if (error) {
                res.status(400).json({ error: error });
                return;
            }
            res.status(200).json(result);
        });
}
