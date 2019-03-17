const { httpPost } = require('../request');
const getServerToken = require('../server_token/getServerToken');

module.exports = function (user_id, experience_amount) {
    return (new Promise(function (resolve, reject) {
        httpPost(process.env.SPACE_CITIZEN_API_URL + '/api/users/add_experience',
            {
                userId: user_id,
                amount: experience_amount
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