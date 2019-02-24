var { doQuery, mysqlError } = require('../../database/');

//get information about a user according to it's ID or username
module.exports = function (req, res, next, userId) {
    doQuery("SELECT `id`, `name` FROM `factions` WHERE `id` = ?", [req.params.factionId])
        .then(function (factionInfo) {
            //check if the user was found
            if (factionInfo.length === 0) {
                res.status(400).json({ error: "Faction not found" });
                return;
            }
            //return first result
            res.status(200).json(factionInfo[0]);
        }, function (error) { mysqlError(res, error) });
}
