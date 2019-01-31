var { doQuery, mysqlError } = require('../../database');

function addToArrayWithoutDuplicate(inArray, elementToAdd) {
    var searchResult = inArray.find(function (e) { return (e.id === elementToAdd.id) });

    if (searchResult)
        return;
    inArray.push(elementToAdd);
}

module.exports = function (req, res, next, userId) {
    var contacts = [];
    doQuery("SELECT users.id, users.username, users.profile_picture FROM `messages` INNER JOIN users ON users.id = messages.sender_id WHERE messages.receiver_id = ?",
        [userId]).then(function (result) {
            result.forEach(element => {
                addToArrayWithoutDuplicate(contacts, element);
            });
            doQuery("SELECT users.id, users.username, users.profile_picture FROM `messages` INNER JOIN users ON users.id = messages.receiver_id WHERE messages.sender_id = ?",
                [userId]).then(function (result) {
                    result.forEach(element => {
                        addToArrayWithoutDuplicate(contacts, element);
                    });
                    res.status(200).json(contacts);
                }, function (error) { mysqlError(res, error) });
        }, function (error) { mysqlError(res, error) });
}