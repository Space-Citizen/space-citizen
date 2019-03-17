module.exports = {
    getUserInfo: require("./user_info/getUserInfo"),
    getUserShip: require('./user_info/getUserShip'),
    setUserPos: require('./user_info/setUserPos'),
    addExperience: require('./user_info/addExperience'),
    addMoney: require('./user_info/addMoney'),
    changeUserOnlineStatus: require('./online_status/changeUserOnlineStatus'),
    resetOnlineStatus: require('./online_status/resetOnlineStatus'),
    getServerToken: require('./server_token/getServerToken')
}