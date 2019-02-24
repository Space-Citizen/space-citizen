var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next) {
    if (!req.body || !req.body.password || !req.body.username || !req.body.email || !req.body.faction) {
        res.status(400).json({ error: "Missing field(s)" });
        return;
    }
    //hashing the password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //Checking if user or email is already used
    doQuery("SELECT id FROM `users` WHERE `username` = ? OR `email` = ?", [req.body.username, req.body.email]).then(function (querySelectResult) {
        //send an error if a user with the same name or email is found
        if (querySelectResult.length > 0) {
            res.status(400).json({ error: "Email or Username already taken" });
            return;
        }
        //Creating user
        doQuery("INSERT INTO `users`(username, email, password, faction) VALUES(?,?,?,?)",
            [req.body.username, req.body.email, hashedPassword, req.body.faction]).then(function (insertResult) {
                //creating jwt token
                var token = jwt.sign({ id: insertResult.insertId }, process.env.SPACE_CITIZEN_JWT_PASSWORD, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(201).send({ auth: true, token: token });

            }, function (error) { mysqlError(res, error) });
    }, function (error) { mysqlError(res, error) });
}
