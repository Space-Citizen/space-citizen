var { doQuery, mysqlError } = require('../../database/');

//get all items
module.exports = function (req, res, next, userId) {
    doQuery("SELECT * FROM `items` ORDER BY `name` ASC", []).then(function (itemList) {
        //send item list
        res.status(200).json(itemList);
    }, function (error) { mysqlError(res, error) });
}
