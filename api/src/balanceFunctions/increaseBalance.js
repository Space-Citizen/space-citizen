const getBalance = require('./getBalance');
const updateBalance = require('./updateBalance');

module.exports = function (userId, increaseAmount) {
    return (new Promise(function (resolve, reject) {
        // get current balance
        getBalance(userId).then((balance) => {
            // calculate new balance
            const newBalance = balance + increaseAmount;
            // update the balance
            updateBalance(userId, newBalance).then(result => {
                resolve(result);
            }).catch((error) => { reject(error) });
        }).catch((error) => {
            reject(error);
        });
    }))
}