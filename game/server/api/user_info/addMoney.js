const { httpPost } = require('../request');
const getServerToken = require('../server_token/getServerToken');

module.exports = function (user_id, money_amount) {
    return (new Promise(function (resolve, reject) {
        httpPost(process.env.SPACE_CITIZEN_API_URL + '/api/users/add_money',
            {
                userId: user_id,
                amount: money_amount
            },
            getServerToken()).then((response) => {
                if (!response || !response.body) {
                    reject("Response body not found");
                    return;
                }
                resolve(response.body);
            }).catch((error) => {
                reject(error);
            });
    }));
}