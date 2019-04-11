var { doQuery, mysqlError } = require('../database/');
var { increaseBalance } = require('../balanceFunctions');


exports.addChallenge = (req, res) => {
  const { userId } = req.params;

  //Checking if user or email is already used
  doQuery("SELECT id FROM `challenge` WHERE `user_id` = ?", [userId]).then(function (querySelectResult) {
    //send an error if a user with the same name or email is found
    if (querySelectResult.length > 0) {
      res.status(400).json({ error: "Already a challenge" });
      return;
    }
    //Creating user
    doQuery("INSERT INTO `challenge`(user_id) VALUES(?)",
      [userId]).then(function (insertResult) {
        //creating jwt token
        res.status(201).send({ success: 'Challenge added' });

      }, function (error) { mysqlError(res, error) });
  }, function (error) { mysqlError(res, error) });
}

exports.getChallenge = (req, res) => {
  const { userId } = req.params;

  //Checking if user or email is already used
  doQuery("SELECT id, UNIX_TIMESTAMP(`date`) AS date FROM `challenge` WHERE `user_id` = ?", [userId]).then(function (querySelectResult) {
    //send an error if a user with the same name or email is found
    if (querySelectResult.length <= 0) {
      res.status(400).json({ error: "You didn't start a challenge" });
      return;
    }
    res.status(200).json({ date: querySelectResult[0].date });
  }, function (error) { mysqlError(res, error) });
}

exports.delChallenge = (req, res) => {
  const { userId } = req.params;

  doQuery("DELETE FROM `challenge` WHERE `user_id` = ?", [userId]).then(function (ressql) {
    increaseBalance(userId, 500).then((result) => {
      res.status(200).json({ success: "Balance updated" });
    }).catch((error) => {
      res.status(400).json({ error: "An error occured while updating your balance" });
    })

  }, function (error) { mysqlError(res, error) });
}
