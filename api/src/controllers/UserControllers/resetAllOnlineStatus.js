var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next) {
    doQuery("UPDATE `users` SET `online_status` = 0")
        .then(function (response) {
            //check if the user was found
            if (response.affectedRows === 0) {
                res.status(400).json({ error: "No row updated" });
                return;
            }
            //return first result
            res.status(200).json({ success: "Reset successfull" });
        }, function (error) { mysqlError(res, error) });
}
