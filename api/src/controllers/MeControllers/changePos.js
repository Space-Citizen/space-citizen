var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    if (!req.body || !req.body.map || !req.body.map_coordinate_x || !req.body.map_coordinate_y) {
        res.status(400).json({ error: "Missing arguments" });
        return;
    }
    doQuery("UPDATE `users` SET `map` = ?, `map_coordinate_x` = ?, `map_coordinate_y` = ? WHERE `id` = ?",
        [req.body.map, req.body.map_coordinate_x, req.body.map_coordinate_y, userId]).then(function (result) {
            if (result.affectedRows === 0) {
                res.status(400).json({ error: "No rows updated" });
                return;
            }
            res.status(200).json({ success: "User's position changed" });
        }, function (error) { mysqlError(res, error) });
}
