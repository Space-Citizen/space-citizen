var { doQuery, mysqlError } = require('../../database/');

function getItemInfo(itemId) {
    return (doQuery("SELECT id, price, name, specifications FROM `items` WHERE `id` = ?", [itemId]));
}

function getUserBalance(userId) {
    return (doQuery("SELECT `money` FROM `users` WHERE `id` = ?", [userId]));
}

function updateUserBalance(newBalance, userId) {
    return (doQuery("UPDATE `users` SET `money` = ? WHERE `id` = ?", [newBalance, userId]));
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

    // get item information
    getItemInfo(req.params.itemId).then(function (itemInfo) {
        if (itemInfo.length === 0) {
            res.status(400).json({ error: "Item not found" });
            return;
        }
        //get first element in array
        itemInfo = itemInfo[0];

        // get user's balance
        getUserBalance(userId).then(function (userBalance) {
            if (userBalance.length === 0) {
                res.status(500).json({ error: "Your account doesn't seems to exist, contact an administrator" });
                return;
            }
            //get first element in array with money attribute
            userBalance = userBalance[0].money;

            // check if user has enough money
            if (userBalance < itemInfo.price) {
                res.status(400).json({ error: "You don't have enough money to buy this item." });
                return;
            }
            // update user's balance
            var newBalance = userBalance - itemInfo.price;
            updateUserBalance(newBalance, userId).then(function (result) {
                //if item is a ship
                if (JSON.parse(itemInfo.specifications).type === "ship") {
                    // add ship to user ships
                    addNewShip(itemInfo, userId).then(function (result) {
                        res.status(200).json({ success: itemInfo.name + " added to your hangar", newBalance: newBalance, itemId: result.insertId });
                    }, function (error) { mysqlError(res, error) });;
                }
                else {
                    // add item to user's inventory
                    addItemToInventory(itemInfo, userId).then(function (result) {
                        res.status(200).json({ success: itemInfo.name + " added to your inventory", newBalance: newBalance, itemId: result.insertId });
                    }, function (error) { mysqlError(res, error) });;
                }
            }, function (error) { mysqlError(res, error) });
        }, function (error) { mysqlError(res, error) });
    }, function (error) { mysqlError(res, error) });
}
