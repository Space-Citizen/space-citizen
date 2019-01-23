var { analyseToken, mysqlError, tokenError } = require('../misc/misc');

//get all items
exports.listAllItems = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT * FROM `items`", [], function (err, results) {
            if (err)
                return mysqlError(err, res);
            //check if the user was found
            res.status(200).json(results);
        });
    }, function (error) {
        tokenError(res);
    });
}

//get item info
exports.getItemInfo = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT * FROM `items` WHERE `id` = ", [req.params.itemId], function (err, results) {
            if (err)
                return mysqlError(err, res);
            if (results.length === 0) {
                res.status(401).json({ error: "Item not found" });
                return;
            }
            //check if the user was found
            res.status(200).json(results[0]);
        });
    }, function (error) {
        tokenError(res);
    });
}



//buy an item
exports.buy = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        // get item information
        db.query("SELECT id, price, name, specifications FROM `items` WHERE `id` = ?", [req.params.itemId], function (err, itemInfo) {
            if (err)
                return mysqlError(err, res);
            if (itemInfo.length === 0) {
                res.status(200).json({ error: "Item not found" });
                return;
            }
            // get user's money balance
            db.query("SELECT `money` FROM `users` WHERE `id` = ?", [connectedUserId], function (err, userInfo) {
                if (err)
                    return mysqlError(err, res);
                if (userInfo.length === 0) {
                    res.status(500).json({ error: "Your account doesn't seems to exist, contact an administrator" });
                    return;
                }
                // check if user has enough money
                if (userInfo[0].money < itemInfo[0].price) {
                    res.status(200).json({ error: "You don't have enough money to buy this item." });
                    return;
                }
                var newBalance = userInfo[0].money - itemInfo[0].price;
                // update user's balance
                db.query("UPDATE `users` SET `money` = ? WHERE `id` = ?", [newBalance, connectedUserId], function (err) {
                    if (err)
                        return mysqlError(err, res);
                    //if item is a ship
                    if (JSON.parse(itemInfo[0].specifications).type === "ship") {
                        // add ship to user ships
                        var shipStatus = {
                            HP: JSON.parse(itemInfo[0].specifications).default_hp,
                            SPEED: JSON.parse(itemInfo[0].specifications).default_speed
                        }
                        db.query("INSERT INTO `ships`(type, owner, status) VALUES(?, ?, ?)", [itemInfo[0].id, connectedUserId, JSON.stringify(shipStatus)], function (err, results) {
                            if (err)
                                return mysqlError(err, res);
                            res.status(200).json({ success: itemInfo[0].name + " added to your hangar", newBalance: newBalance });
                        });
                    }
                    else {
                        // add item to user's inventory
                        db.query("INSERT INTO `inventory`(item_type, owner) VALUES(?, ?)", [itemInfo[0].id, connectedUserId], function (err, results) {
                            if (err)
                                return mysqlError(err, res);
                            res.status(200).json({ success: itemInfo[0].name + " added to your inventory", newBalance: newBalance });
                        });
                    }
                });
            });
        });
    }, function (error) {
        tokenError(res);
    });
}
