var { doQuery, mysqlError } = require('../../database/');
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

function getUserBalance(userId, itemInfo, waterfallNext) {
    doQuery("SELECT `money` FROM `users` WHERE `id` = ?", [userId]).then(function (userBalance) {
        if (userBalance.length === 0) {
            waterfallNext("Your account doesn't seems to exist, contact an administrator");
            return;
        }
        //get first element in array with money attribute
        userBalance = userBalance[0].money;

        // check if user has enough money
        if (userBalance < itemInfo.price) {
            waterfallNext("You don't have enough money to buy this item.");
            return;
        }
        // update user's balance
        var newBalance = userBalance - itemInfo.price;
        // call next function
        waterfallNext(null, itemInfo, newBalance);
    }, function (error) { waterfallNext(error) });
}

function updateUserBalance(itemInfo, newBalance, userId, waterfallNext) {
    doQuery("UPDATE `users` SET `money` = ? WHERE `id` = ?", [newBalance, userId]).then(function (result) {
        //if item is a ship
        if (JSON.parse(itemInfo.specifications).type === "ship") {
            // add ship to user ships
            addNewShip(itemInfo, userId).then(function (result) {
                waterfallNext(null, { success: itemInfo.name + " added to your hangar", newBalance: newBalance, itemId: result.insertId });
            }, function (error) { waterfallNext(error) });;
        }
        else {
            // add item to user's inventory
            addItemToInventory(itemInfo, userId).then(function (result) {
                waterfallNext(null, { success: itemInfo.name + " added to your inventory", newBalance: newBalance, itemId: result.insertId });
            }, function (error) { waterfallNext(error) });;
        }
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
            // get user's balance
            getUserBalance(userId, itemInfo, waterfallNext);
        },
        function (itemInfo, newBalance, waterfallNext) {
            // update user's balance
            updateUserBalance(itemInfo, newBalance, userId, waterfallNext);
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
