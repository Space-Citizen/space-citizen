var { analyseToken, mysqlError } = require('../misc/misc');

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
    });
}



//buy an item
exports.buy = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        res.status(501).json({ error: "Not implemented yet" });
    });
}
