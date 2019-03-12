var jwt = require('jsonwebtoken');

module.exports = function () {
    var token = jwt.sign({}, process.env.SPACE_CITIZEN_SERVER_JWT_PASSWORD, {
        expiresIn: 604800 // expires in 1 week
    });
    return (token);
}
