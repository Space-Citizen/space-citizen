var decodeToken = require('./decodeToken');

module.exports = fct => (req, res, next) => {
    decodeToken(req, res).then(function (userId) {
        fct(req, res, next, userId);
    }, function (error) {
        if (error && error.name === "TokenExpiredError")
            return res.status(200).json({ error: "Your session has expired, please sign in" });
        res.status(200).json({ error: "Unable to validate your token, please sign in" });
    });
};