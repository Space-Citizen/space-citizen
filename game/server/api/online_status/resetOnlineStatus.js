const { httpPost } = require('../request');
const getServerToken = require('../getServerToken');

// Change online status, true = online, false = offline
module.exports = function () {
    const server_token = getServerToken();

    return (new Promise(function (resolve, reject) {
        httpPost(process.env.SPACE_CITIZEN_API_URL + '/api/users/reset_online_status',
            {}, server_token).then((response) => {
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