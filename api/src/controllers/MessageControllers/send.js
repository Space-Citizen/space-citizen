var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
    if (!req.body.receiver || !req.body.content) {
        res.status(400).json({ error: "Missing field(s)" });
        return;
    }

    doQuery("INSERT INTO `messages`(sender_id, receiver_id, content, date) VALUES(?, ?, ?, ?)",
        [userId, req.body.receiver, req.body.content, new Date()]).then(function (result) {
            res.status(200).json({ success: "Message sent", insertId: result.insertId });
        }, function (error) { mysqlError(res, error) });;
}
