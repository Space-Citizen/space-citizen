var { analyseToken, mysqlError } = require('../misc/misc');

//get information about a user according to it's ID or username
exports.getProfileInfo = function (req, res) {
    var tokenPromise = analyseToken(req, res)
    if (!tokenPromise)
        return;

    //wait for token confirmation
    tokenPromise.then(function (connectedUserId) {
        db.query("SELECT username FROM `users` WHERE `id` = ? OR `username` = ?", [req.params.id, req.params.id], function (err, results) {
            if (err)
                return mysqlError(err, res);
            //check if the user was found
            if (results.length === 0) {
                res.status(200).json({ error: "User not found" });
                return;
            }
            //return first result
            res.status(200).json(results[0]);
        });
    });
}

