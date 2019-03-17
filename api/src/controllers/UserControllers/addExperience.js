var { doQuery, mysqlError } = require('../../database/');
var waterfall = require('async-waterfall');

// Get the current experience of the player
function getUserExperience(userId) {
    return (new Promise((resolve, reject) => {
        doQuery("SELECT `experience` FROM `users` WHERE `id` = ?", [userId]).then(response => {
            if (response.length === 0) {
                reject("User not found");
                return;
            }
            resolve(response[0].experience);
        }).catch(error => {
            reject(error);
        });
    }));
}

// Change the experience value
function updateUserExperience(userId, newAmount) {
    return (doQuery("UPDATE `users` SET `experience` = ? WHERE `id` = ?", [newAmount, userId]));
}

//Increase the user experience
module.exports = function (req, res, next) {
    if (!req.body || !req.body.userId || !req.body.amount) {
        res.status(400).json({ error: 'Missing parameters' });
        return;
    }
    waterfall([
        function (waterfallNext) {
            getUserExperience(req.body.userId).then(userExperience => {
                waterfallNext(null, userExperience);
            }).catch(error => {
                waterfallNext(error);
            });
        }
    ], function (error, experience) {
        if (error) {
            res.status(400).json({ error: error });
            return;
        }
        var newExperienceValue = Number(experience) + Number(req.body.amount);
        updateUserExperience(req.body.userId, newExperienceValue).then(function (result) {
            //check if the user was found
            if (result.affectedRows === 0) {
                res.status(400).json({ error: "User not found" });
                return;
            }
            res.status(200).json({ success: "Experience added", experience: newExperienceValue });
        }, function (error) { mysqlError(res, error) });
    });
}
