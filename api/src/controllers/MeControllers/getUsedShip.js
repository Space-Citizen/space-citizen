var { doQuery, mysqlError } = require('../../database/');

// get user's ships
module.exports = function (req, res, next, userId) {
    // get user's ships
    doQuery("SELECT ships.`type`, items.`name` FROM `ships` INNER JOIN `items` ON `items`.id = ships.`type` WHERE ships.`owner` = ? AND ships.`in_use` = ?",
        [userId, true]).then(function (ship) {
            if (ship.length === 0) {
                res.status(400).json({ error: "No ship found" });
                return;
            }
            res.status(200).json(ship[0]);
        }, function (error) { mysqlError(res, error) });
}