var jwt = require('jsonwebtoken');

exports.analyseToken = function (req, res) {
    //get token from header
    var token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
        return (false);
    }
    return new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.SPACE_CITIZEN_JWT_PASSWORD, function (err, decoded) {
            if (err) {
                reject(-1);
                return;
            }
            resolve(decoded.id);
        });
    });
}

exports.mysqlError = function (err, res) {
    console.log("Mysql error: ", err);
    res.status(500).json({ error: "An error occured" });
}

exports.tokenError = function (res) {
    console.log("token error");
    res.status(200).json({ error: "Invalid token" });
}