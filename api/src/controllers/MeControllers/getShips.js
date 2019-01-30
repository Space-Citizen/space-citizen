var { doQuery, mysqlError } = require('../../database/');

// get user's ships
module.exports = function (req, res, next, userId) {
    // get user's ships
    doQuery("SELECT ships.id, ships.status, items.id as `ship_id`, items.name, items.description, items.price, items.specifications, items.icon\
        FROM `ships` INNER JOIN `items` ON ships.type = items.id AND ships.owner = ? ORDER BY items.name ASC",
        [userId]).then(function (ships) {
            res.status(200).json(ships);
        }, function (error) { mysqlError(res, error) });
}