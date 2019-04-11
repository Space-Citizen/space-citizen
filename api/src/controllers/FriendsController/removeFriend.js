var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
  if (userId === req.params.userId) {
    res.status(400).json({ error: "You can't unsubscribe from yourself" });
    return;
  }
  doQuery(
    'DELETE FROM `friends` WHERE `subscribed_by` = ? AND `subscribed_to` = ?',
    [userId, req.params.userId]).then(function (result) {
      res.status(200).json({ success: 'Unsubscription successful' });
    }, function (error) { mysqlError(res, error) });
}
