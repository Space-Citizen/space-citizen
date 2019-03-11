var jwt = require('jsonwebtoken');

function getUserIdFromToken(token, decode_password) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            reject("TokenNotFoundError");
            return;
        }
        jwt.verify(token, decode_password, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
}

module.exports = function (req, decode_password) {
    //get token from header
    var token = req.headers['x-access-token'];

    return getUserIdFromToken(token, decode_password);
}
