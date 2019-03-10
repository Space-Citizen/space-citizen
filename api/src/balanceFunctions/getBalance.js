var { doQuery } = require('../database/');

module.exports = function (userId) {
    return (new Promise(function (resolve, reject) {
        doQuery("SELECT `money` FROM `users` WHERE `id` = ?", [userId]).then(function (userBalance) {
            if (!userBalance || userBalance.length === 0) {
                reject("Unable to find your balance");
                return;
            }
            //get first element in array with money attribute
            userBalance = userBalance[0].money;
            resolve(userBalance);
        }, function (error) { reject(error) });
    }))
}