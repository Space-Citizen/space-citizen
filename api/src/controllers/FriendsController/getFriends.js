var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next) {
  doQuery(
    'SELECT `subscribed_to` FROM `friends` WHERE `subscribed_by` = ?',
    [req.params.userId]).then(function (result) {
      res.status(200).json(result);
    }, function (error) { mysqlError(res, error) });
}
