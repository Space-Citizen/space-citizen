var { analyseToken, mysqlError } = require('../misc/misc');

//get information about a user according to it's ID or username
exports.getInfo = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT username FROM `users` WHERE `id` = ?", [connectedUserId], function (err, results) {
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
    });
}


exports.getInventory = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT player_inventory.id, items.id as `item_id`, items.name, items.description, items.price, items.specifications, items.icon\
         FROM `player_inventory` INNER JOIN `items` ON player_inventory.item_type = items.id AND player_inventory.owner = ?", [connectedUserId], function (err, results) {
                if (err)
                    return mysqlError(err, res);
                //return first result
                res.status(200).json(results);
            });
    });
}

