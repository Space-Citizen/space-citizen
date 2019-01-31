
class User {
    constructor(user_info, socket, token) {
        this.id = user_info.id;
        this.username = user_info.username;
        this.token = token;
        this.socket = socket;
    }
}

module.exports = User;
