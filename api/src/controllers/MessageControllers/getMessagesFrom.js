var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
    doQuery("SELECT * from `messages` WHERE (`sender_id` = ? AND `receiver_id` = ?) OR (`receiver_id` = ? AND `sender_id` = ?)",
        [userId, req.params.userId, userId, req.params.userId]).then(function (result) {
            res.status(200).json(result);
        }, function (error) { mysqlError(res, error) });;
}
