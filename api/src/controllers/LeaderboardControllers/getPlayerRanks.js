var { doQuery } = require('../../database');
var waterfall = require('async-waterfall');

function countPlayers() {
  return (new Promise((resolve, reject) => {
    doQuery("SELECT COUNT(*) AS nb FROM `users`").then(response => {
      resolve(response[0].nb);
    }).catch(error => {
      reject(error);
    });
  }));
}

function getExperienceRank(userId) {
  return (new Promise((resolve, reject) => {
    // first, sort and calculate the rank of each player based on the experience
    // then find the wanted user in the list
    doQuery("SET @rank := 0;SELECT rank FROM (SELECT @rank := @rank + 1 AS rank, `id` FROM `users` ORDER BY `experience` DESC) AS res WHERE res.id = ?", userId)
      .then((response) => {
        resolve(response[1][0].rank);
      }, function (error) { reject(error) });
  }));
}

function getWealthRank(userId) {
  return (new Promise((resolve, reject) => {
    // first, sort and calculate the rank of each player based on the money
    // then find the wanted user in the list
    doQuery("SET @rank := 0;SELECT rank FROM (SELECT @rank := @rank + 1 AS rank, `id` FROM `users` ORDER BY `money` DESC) AS res WHERE res.id = ?", userId)
      .then((response) => {
        resolve(response[1][0].rank);
      }, function (error) { reject(error) });
  }));
}

module.exports = function (req, res, next) {
  // Object storing the different ranks
  var ranks = {};

  waterfall([
    function (waterfallNext) {
      countPlayers().then(nbPlayers => {
        ranks.totalPlayers = nbPlayers;
        waterfallNext(null);
      });
    },
    function (waterfallNext) {
      getExperienceRank(req.params.userId).then((rank) => {
        ranks.experience = rank;
        waterfallNext(null);
      });
    },
    function (waterfallNext) {
      getWealthRank(req.params.userId).then((rank) => {
        ranks.wealth = rank;
        waterfallNext(null);
      });
    },
  ],
    function (error, response) {
      if (error) {
        res.status(400).json({ error: error });
        return;
      }
      res.status(200).json(ranks);
    });
}
