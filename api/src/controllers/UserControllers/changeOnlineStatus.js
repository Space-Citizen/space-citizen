var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next) {
    if (!req.body || !req.body.online_status || !req.body.user_id) {
        res.status(400).json({ error: "Field(s) missing" });
        return;
    }
    doQuery("UPDATE `users` SET `online_status` = ? WHERE `id` = ?", [req.body.online_status, req.body.user_id])
        .then(function (response) {
            //check if the user was found
            if (response.affectedRows === 0) {
                res.status(400).json({ error: "No row updated" });
                return;
            }
            //return first result
            res.status(200).json({ success: "Status changed" });
        }, function (error) { mysqlError(res, error) });
}
