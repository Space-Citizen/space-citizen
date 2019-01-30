var jwt = require('jsonwebtoken');

function getUserIdFromToken(token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            reject("TokenNotFoundError");
            return;
        }
        jwt.verify(token, process.env.SPACE_CITIZEN_JWT_PASSWORD, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded.id);
        });
    });
}

module.exports = function (req, res, next, userId) {
    //get token from header
    var token = req.headers['x-access-token'];

    return getUserIdFromToken(token);
}
