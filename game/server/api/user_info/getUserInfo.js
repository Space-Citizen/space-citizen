const { httpGet } = require('../request');

module.exports = function (token) {
    return (new Promise(function (resolve, reject) {
        httpGet(process.env.SPACE_CITIZEN_API_URL + '/api/me/info', token).then((response) => {
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