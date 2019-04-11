var { doQuery, mysqlError } = require('../../database/');
var { getLevel } = require('./experienceFunctions/');

//get information about a user according to it's ID or username

module.exports = function (req, res, next, userId) {
    doQuery("SELECT `id`, `username`, `profile_picture`, `faction`, `experience` FROM `users` WHERE `id` = ?", [req.params.id])
        .then(function (userInfo) {
            //check if the user was found
            if (userInfo.length === 0) {
                res.status(400).json({ error: "User not found" });
                return;
            }
            // get level from first element of array
            userInfo = getLevel(userInfo[0]);
            //return first result
            res.status(200).json(userInfo);
        }, function (error) { mysqlError(res, error) });
}
