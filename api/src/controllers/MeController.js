var { analyseToken, mysqlError, tokenError } = require('../misc/misc');

//get information about a user according to it's ID or username
exports.getInfo = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT username, money FROM `users` WHERE `id` = ?", [connectedUserId], function (err, results) {
            if (err)
                return mysqlError(err, res);
            //check if the user was found
            if (results.length === 0) {
                res.status(200).json({ error: "User not found" });
                return;
            }
            //return first result
            res.status(200).json(results[0]);
        });
    }, function (error) {
        tokenError(res);
    });
}

// get user's item
exports.getInventory = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise || tokenPromise === -1)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        //get items in user inventory
        db.query("SELECT inventory.id, inventory.item_status, items.id as `item_id`, items.name, items.description, items.price, items.specifications, items.icon\
         FROM `inventory` INNER JOIN `items` ON inventory.item_type = items.id AND inventory.owner = ? AND inventory.used_on_ship IS NULL ORDER BY items.name ASC", [connectedUserId], function (err, results) {
                if (err)
                    return mysqlError(err, res);
                res.status(200).json(results);
            });
    }, function (error) {
        tokenError(res);
    });
}

// get user's ships
exports.getShips = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise || tokenPromise === -1)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT ships.id, ships.status, items.id as `ship_id`, items.name, items.description, items.price, items.specifications, items.icon\
        FROM `ships` INNER JOIN `items` ON ships.type = items.id AND ships.owner = ? ORDER BY items.name ASC", [connectedUserId], function (err, results) {
                if (err)
                    return mysqlError(err, res);
                res.status(200).json(results);
            });
    }, function (error) {
        tokenError(res);
    });
}

exports.updateInventory = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;
    if (!req.body || !req.body.itemsId) {
        res.status(200).json({ error: "Missing parameters" });
        return;
    }


    if (req.body.itemsId.length === 0) {
        res.status(200).json({ success: "No action required" });
        return;
    }
    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        //find the item in the user's inventory
        var idArray = req.body.itemsId.map(function (e) { return e.id; });
        db.query("SELECT id, item_type, item_status FROM `inventory` WHERE `id` IN (?) AND `owner` = ?", [idArray, connectedUserId], function (err, itemInfo) {
            if (err)
                return mysqlError(err, res);
            if (itemInfo.length === 0) {
                res.status(200).json({ error: "Item not found" });
                return;
            }
            // set item to ship
            var idArrayUpdated = itemInfo.map(function (e) { return e.id; });
            db.query("UPDATE `inventory` SET `used_on_ship` = NULL WHERE `id` IN (?)", [idArrayUpdated], function (err, updateResults) {
                if (err)
                    return mysqlError(err, res);
                res.status(200).json({ success: "Item moved successfully" });
            });
        });
    }, function (error) {
        tokenError(res);
    });
}