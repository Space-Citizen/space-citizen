var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    doQuery("DELETE FROM `users` WHERE `id` = ?", [userId]).then(function (result) {
        if (result.affectedRows === 0) {
            res.status(400).json({ error: "An error occured while deleting your account" });
            return;
        }
        //return first result
        res.status(200).json({ success: "Account deleted" });
    }, function (error) { mysqlError(res, error) });
}
