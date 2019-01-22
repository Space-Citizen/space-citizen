var { analyseToken, mysqlError, tokenError } = require('../misc/misc');

//get information about a user according to it's ID or username
// require

//!!!!!!!!!!! NEED TO ADD: !!!!///
// -Check if number of items is respected
exports.edit = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;
    if (!req.body || !req.body.shipId || !req.body.itemsToShip || !req.body.itemsToInventory) {
        res.status(200).json({ error: "Missing parameters" });
        return;
    }
    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        var itemsToShipId = req.body.itemsToShip.map(function (e) { return e.id; });
        var itemsToInventoryId = req.body.itemsToInventory.map(function (e) { return e.id; });
        // add item to ship
        var addItemToShipPromise = new Promise(function (resolve, reject) {
            // if no action is to be done, exit
            if (itemsToShipId.length === 0) {
                resolve(true);
                return;
            }
            db.query("UPDATE `inventory` SET `used_on_ship` = ? WHERE `id` IN (?) AND `owner` = ?", [req.body.shipId, itemsToShipId, connectedUserId], function (err) {
                if (err) {
                    console.log("mysql error: ", err);
                    reject(false);
                    return;
                }
                resolve(true);
            })
        });
        // add item to inventory
        var addItemToInventoryPromise = new Promise(function (resolve, reject) {
            // if no action is to be done, exit
            if (itemsToInventoryId.length === 0) {
                resolve(true);
                return;
            }
            db.query("UPDATE `inventory` SET `used_on_ship` = NULL WHERE `id` IN (?) AND `owner` = ?", [itemsToInventoryId, connectedUserId], function (err) {
                if (err) {
                    console.log("mysql error: ", err);
                    reject(false);
                    return;
                }
                resolve(true);
            })
        });
        Promise.all([addItemToShipPromise, addItemToInventoryPromise]).then(values => {
            if (!values[0] || !values[1]) {
                res.status(200).json({ error: "An error occured while moving item(s)" });
                return;
            }
            res.status(200).json({ success: "Item(s) moved" });
        });
    }, function (error) {
        tokenError(res);
    });
}

// get inventory of a ship
// TODO:
// -Allow only owner to see the content of the ship

exports.getInventory = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT inventory.id, inventory.item_status, items.id as `item_id`, items.name, items.description, items.specifications, items.icon\
        FROM `inventory` INNER JOIN `items` ON inventory.item_type = items.id AND inventory.used_on_ship = ? AND inventory.owner = ? ORDER BY items.name ASC", [req.params.shipId, connectedUserId], function (err, results) {
                if (err)
                    return mysqlError(err, res);
                res.status(200).json(results);
            });
    }, function (error) {
        tokenError(res);
    });
}