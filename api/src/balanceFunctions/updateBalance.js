var { doQuery } = require('../database/');

module.exports = function (userId, newAmount) {
    return (new Promise(function (resolve, reject) {
        doQuery("UPDATE `users` SET `money` = ? WHERE `id` = ?", [newAmount, userId]).then(function (result) {
            if (result.affectedRows === 0) {
                reject("Unable to update balance");
                return;
            }
            resolve("Balance updated");
        }, function (error) { reject(error) });
    }));
}