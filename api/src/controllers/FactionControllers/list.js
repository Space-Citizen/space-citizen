var { doQuery, mysqlError } = require('../../database');

//get information about a user according to it's ID or username
module.exports = function (req, res, next) {
    doQuery("SELECT `id`, `name` FROM `factions`", [])
        .then(function (factions) {
            //check if the user was found
            if (factions.length === 0) {
                res.status(400).json({ error: "No faction found" });
                return;
            }
            //return first result
            res.status(200).json(factions);
        }, function (error) { mysqlError(res, error) });
}
