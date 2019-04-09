var { doQuery, mysqlError } = require('../../database');

module.exports = function (req, res, next) {
  doQuery("SELECT `id`, `username`, `experience`, `profile_picture`, `faction` FROM `users` ORDER BY `experience` DESC")
    .then((users) => {
      res.status(200).json(users);
    }, function (error) { mysqlError(res, error) });
}
