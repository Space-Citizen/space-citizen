var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    doQuery("SELECT `id`, `username`, `money`, `profile_picture`, `faction`, `map`, `map_coordinate_x`, `map_coordinate_y`,\
    `experience` FROM `users` WHERE `id` = ?", [userId]).then(function (userInfo) {
        //check if the user was found
        if (userInfo.length === 0) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        //return first result
        res.status(200).json(userInfo[0]);
    }, function (error) { mysqlError(res, error) });
}
