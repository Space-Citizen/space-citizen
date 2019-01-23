var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var { mysqlError } = require('../misc/misc');

exports.signIn = function (req, res) {
    if (!req.body || !req.body.password || !req.body.email) {
        res.status(400).json({ error: "Missing field(s)" });
        return;
    }
    db.query("SELECT id, password FROM `users` WHERE `email` = ?", [req.body.email], (err, result) => {
        if (err)
            return mysqlError(err, res);
        //check if user was found
        if (result.length === 0) {
            res.status(200).json({ error: "User not found" });
            return;
        }
        //comapre password with the hashed password
        var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
        if (!passwordIsValid) {
            return res.status(200).send({ auth: false, token: null, error: "Password or email invalid" });
        }
        var token = jwt.sign({ id: result[0].id }, process.env.SPACE_CITIZEN_JWT_PASSWORD, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
}

exports.signUp = function (req, res) {
    if (!req.body || !req.body.password || !req.body.username || !req.body.email) {
        res.status(400).json({ error: "Missing field(s)" });
        return;
    }
    //hashing the password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //Checking if user or email is already used
    db.query("SELECT id FROM `users` WHERE `username` = ? OR `email` = ?", [req.body.username, req.body.email], (err, result) => {
        if (err)
            return mysqlError(err, res);
        //send an error if a user with the same name or email is found
        if (result.length > 0) {
            res.status(200).json({ error: "Email or Username already taken" });
            return;
        }

        //Creating user
        db.query("INSERT INTO `users`(username, email, password) VALUES(?,?,?)", [req.body.username, req.body.email, hashedPassword], (err, result) => {
            if (err)
                return mysqlError(err, res);
            //creating jwt token
            var token = jwt.sign({ id: result.insertId }, process.env.SPACE_CITIZEN_JWT_PASSWORD, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(201).send({ auth: true, token: token });
        });
    });
}
