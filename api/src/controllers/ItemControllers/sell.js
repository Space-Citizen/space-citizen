var { doQuery, mysqlError } = require('../../database/');
var waterfall = require('async-waterfall');

function getUserBalance(userId, waterfallNext) {
    doQuery("SELECT `money` FROM `users` WHERE `id` = ?", [userId]).then(function (userBalance) {
        if (userBalance.length === 0) {
            waterfallNext("Unable to find your balance");
            return;
        }
        //get first element in array with money attribute
        userBalance = userBalance[0].money;
        waterfallNext(null, userBalance)
    }, function (error) { waterfallNext(error) });
}
function getItemInfo(itemId, userId, balance, waterfallNext) {
    doQuery("SELECT items.`price` FROM `inventory` INNER JOIN `items` ON inventory.`item_type` = items.`id`\
WHERE inventory.`id` = ? AND inventory.`owner` = ?", [itemId, userId]).then(function (itemInfo) {
        if (itemInfo.length === 0) {
            waterfallNext("Item not found");
            return;
        }
        //get first element in array
        itemInfo = itemInfo[0];
        // call next function
        waterfallNext(null, itemInfo, balance);
    }, function (error) { waterfallNext(error) });
}

function deleteItemFromInventory(itemId, itemInfo, balance, waterfallNext) {
    doQuery("DELETE FROM `inventory` WHERE `id` = ?", [itemId]).then(function (deleteResult) {
        if (deleteResult.affectedRows === 0) {
            waterfallNext("An error occured while deleting your account");
            return;
        }
        waterfallNext(null, itemInfo, balance);
    }, function (error) { waterfallNext(error) });
}

function updateUserBalance(itemInfo, balance, userId, waterfallNext) {
    // update user's balance
    // selling the item give back half of the original value
    var newBalance = balance + (itemInfo.price / 2);

    doQuery("UPDATE `users` SET `money` = ? WHERE `id` = ?", [newBalance, userId]).then(function (result) {
        if (result.affectedRows === 0) {
            waterfallNext("An error occured while updating your balance");
            return;
        }
        waterfallNext(null);
    }, function (error) { waterfallNext(error) });
}

//get item info
module.exports = function (req, res, next, userId) {
    // check paramters
    if (!req.params.itemId) {
        res.status(400).json({ error: "Missing paramters" });
        return;
    }
    waterfall([
        function (waterfallNext) {
            // get the user's balance
            getUserBalance(userId, waterfallNext);
        },
        function (balance, waterfallNext) {
            // get informations about the item (price ..)
            getItemInfo(req.params.itemId, userId, balance, waterfallNext);
        },
        function (itemInfo, balance, waterfallNext) {
            // delete the item from the inventory
            deleteItemFromInventory(req.params.itemId, itemInfo, balance, waterfallNext);
        },
        function (itemInfo, balance, waterfallNext) {
            // update the user's balance
            updateUserBalance(itemInfo, balance, userId, waterfallNext);
        }
    ], function (error, result) {
        if (error) {
            res.status(400).json({ error: error });
            return;
        }
        res.status(200).json({ success: "Item sold" });
    });
}