var decodeToken = require('../tokens/decodeToken');
var jwt = require('jsonwebtoken');

module.exports = fct => (req, res, next) => {
    // decode the token to verify its valid
    decodeToken(req, process.env.SPACE_CITIZEN_SERVER_JWT_PASSWORD).then(function (token_decoded) {
        fct(req, res, next);
    }).catch(error => {
        res.status(400).json({ error: error });
    });
};