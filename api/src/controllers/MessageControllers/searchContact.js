var { doQuery, mysqlError } = require('../../database');

module.exports = function (req, res, next, userId) {
    doQuery("SELECT id, username FROM `users` WHERE username LIKE ?", "%" + req.body.searchQuery + "%").then(function (result) {
        res.status(200).json(result);
    }, function (error) { mysqlError(res, error) });
}