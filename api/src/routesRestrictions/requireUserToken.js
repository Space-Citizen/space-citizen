var decodeToken = require('../tokens/decodeToken');
var { doQuery, mysqlError } = require('../database/');
const ERROR_CODES = require('../../common/errorCodes');

function sendInvalidTokenError(res, error) {
    if (error && error.name === "TokenExpiredError")
        return res.status(400).json({ error: "Your session has expired, please sign in", code: ERROR_CODES.TOKEN_EXPIRED });
    res.status(400).json({ error: "Unable to validate your token, please sign in", code: ERROR_CODES.TOKEN_INVALID });
}

module.exports = (fct, disabledInGame) => (req, res, next) => {
    // decode the token to verify its valid
    decodeToken(req, process.env.SPACE_CITIZEN_JWT_PASSWORD).then(function (token_decoded) {
        const userId = token_decoded.id;
        // check if the account exist
        doQuery("SELECT `id`, `online_status` FROM `users` WHERE `id` = ?", [userId]).then(function (queryResults) {
            if (queryResults.length === 0) {
                sendInvalidTokenError(res, null);
                return;
            }
            // If player is in game
            if (disabledInGame && queryResults[0].online_status === 1) {
                res.status(400).json({ error: "This action is not allowed while in game" });
                return;
            }
            fct(req, res, next, userId);
        }, function (error) {
            mysqlError(res, error);
        });
    }, function (error) {
        sendInvalidTokenError(res, error);
    });
};