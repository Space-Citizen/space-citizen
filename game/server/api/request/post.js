const request = require('request');

module.exports = function (url, data, token) {
    return (new Promise(function (resolve, reject) {
        request.post({
            url: url,
            form: data,
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
