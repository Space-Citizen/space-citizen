var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
  doQuery(
    'SELECT `id` FROM `friends` WHERE `subscribed_by` = ? AND `subscribed_to` = ?',
    [userId, req.params.userId]).then(function (result) {
      res.status(200).json((result.length === 0 ? false : true));
    }, function (error) { mysqlError(res, error) });
}
