var { doQuery, mysqlError } = require('../../database');

module.exports = function (req, res, next) {
  doQuery("SELECT `id`, `username`, `money`, `profile_picture`, `faction` FROM `users`")
    .then((users) => {
      res.status(200).json(users);
    }, function (error) { mysqlError(res, error) });
}
