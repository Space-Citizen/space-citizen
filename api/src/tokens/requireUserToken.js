var decodeToken = require('./decodeToken');
var { doQuery, mysqlError } = require('../database/');
const ERROR_CODES = require('../../common/errorCodes');

function sendError(res, error) {
    if (error && error.name === "TokenExpiredError")
        return res.status(400).json({ error: "Your session has expired, please sign in", code: ERROR_CODES.TOKEN_EXPIRED });
    res.status(400).json({ error: "Unable to validate your token, please sign in", code: ERROR_CODES.TOKEN_INVALID });
}

module.exports = fct => (req, res, next) => {
    decodeToken(req, res).then(function (userId) {
        // check if the account exist
        doQuery("SELECT `id` FROM `users` WHERE `id` = ?", [userId]).then(function (queryResults) {
            if (queryResults.length === 0) {
                sendError(res, null);
                return;
            }
            fct(req, res, next, userId);
        }, function (error) {
            mysqlError(res, error);
        });
    }, function (error) {
        sendError(res, error);
    });
};