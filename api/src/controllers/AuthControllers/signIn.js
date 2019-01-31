var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next) {
    if (!req.body || !req.body.password || !req.body.email) {
        res.status(400).json({ error: "Missing field(s)" });
        return;
    }
    doQuery("SELECT id, password FROM `users` WHERE `email` = ?", [req.body.email]).then(function (queryResults) {
        //check if user was found
        if (queryResults.length === 0) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        //comapre password with the hashed password
        var passwordIsValid = bcrypt.compareSync(req.body.password, queryResults[0].password);
        if (!passwordIsValid) {
            return res.status(400).send({ auth: false, token: null, error: "Password or email invalid" });
        }
        var token = jwt.sign({ id: queryResults[0].id }, process.env.SPACE_CITIZEN_JWT_PASSWORD, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });

    }, function (error) { mysqlError(res, error) });
}
