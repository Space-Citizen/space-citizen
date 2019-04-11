var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
  if (userId === req.params.userId) {
    res.status(400).json({ error: "You can't subscribe to yourself" });
    return;
  }
  doQuery(
    'SELECT `id` FROM `friends` WHERE `subscribed_by` = ? AND `subscribed_to` = ?',
    [userId, req.params.userId]).then(function (result) {
      if (result.length > 0) {
        res.status(400).json({ error: "You are already subscribed to this user" });
        return;
      }
      doQuery(
        'INSERT INTO friends(subscribed_by, subscribed_to) VALUES(?, ?)',
        [userId, req.params.userId]).then(function (result) {
          res.status(200).json({ success: 'Subscription successful' });
        }, function (error) { mysqlError(res, error) });
    }, function (error) { mysqlError(res, error) });
}
