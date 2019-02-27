const request = require('request');

module.exports = function (url, token) {
    return (new Promise(function (resolve, reject) {
        request.get({
            url: url,
            headers: { "x-access-token": token }
        }, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
                resolve(response);
            }
        });
    }));
}
