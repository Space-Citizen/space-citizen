var { doQuery, mysqlError } = require('../../database/');

//get item info
module.exports = function (req, res, next, userId) {
    doQuery("SELECT * FROM `items` WHERE `id` = ", [req.params.itemId]).then(function (itemsResult) {
        if (itemsResult.length === 0) {
            res.status(401).json({ error: "Item not found" });
            return;
        }
        //check if the user was found
        res.status(200).json(itemsResult[0]);
    }, function (error) { mysqlError(res, error) });
}