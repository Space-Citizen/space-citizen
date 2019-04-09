module.exports = function (experience) {
    // static values
    const firstLevelExperience = 10000;
    const levelDifficultyMultiplier = 2;

    // Start at level 1
    var level = 1;
    var nextLevelExpRequirement = firstLevelExperience;
    // Go thourght each level until a level match
    while (experience > nextLevelExpRequirement) {
        level++;
        nextLevelExpRequirement *= levelDifficultyMultiplier;
    }
    return ({ level: level, nextLevelExperience: nextLevelExpRequirement });
}