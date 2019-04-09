var convertExpToLevel = require('./convertExpToLevel');

module.exports = function (userInfo) {

    // get level
    const level = convertExpToLevel(userInfo.experience);
    userInfo.level = level.level;
    userInfo.nextLevelExperience = level.nextLevelExperience;

    return (userInfo);
}