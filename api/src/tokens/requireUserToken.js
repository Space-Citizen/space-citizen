var decodeToken = require('./decodeToken');
const ERROR_CODES = require('../../common/errorCodes');

module.exports = fct => (req, res, next) => {
    decodeToken(req, res).then(function (userId) {
        fct(req, res, next, userId);
    }, function (error) {
        if (error && error.name === "TokenExpiredError")
            return res.status(400).json({ error: "Your session has expired, please sign in", code: ERROR_CODES.TOKEN_EXPIRED });
        res.status(400).json({ error: "Unable to validate your token, please sign in", code: ERROR_CODES.TOKEN_INVALID });
    });
};