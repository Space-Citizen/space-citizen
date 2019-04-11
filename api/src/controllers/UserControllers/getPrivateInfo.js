var { doQuery, mysqlError } = require('../../database/');
var { getLevel } = require('./experienceFunctions/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    doQuery("SELECT `id`, `username`, `money`, `profile_picture`, `faction`, `map`, `map_coordinate_x`, `map_coordinate_y`,\
    `experience` FROM `users` WHERE `id` = ?", [userId]).then(function (userInfo) {
        //check if the user was found
        if (userInfo.length === 0) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        // get level from first element of array
        userInfo = getLevel(userInfo[0]);
        res.status(200).json(userInfo);
    }, function (error) { mysqlError(res, error) });
}
