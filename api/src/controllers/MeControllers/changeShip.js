var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    if (!req.body || !req.body.shipId) {
        res.status(400).json({ error: "Missing arguments" });
        return;
    }
    doQuery("UPDATE `ships` SET `in_use` = ? WHERE `id` = ? AND `owner` = ?", [1, req.body.shipId, userId]).then(function (result) {
        if (result.affectedRows === 0) {
            res.status(400).json({ error: "No rows updated" });
            return;
        }
        res.status(200).json({ success: "Used ship changed" });
    }, function (error) { mysqlError(res, error) });
}
