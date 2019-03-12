const generateServerToken = require('./generateServerToken');

var server_token = undefined;

module.exports = function () {
    // Check if server token exist
    if (server_token === undefined) {
        // if not, generate a new one
        server_token = generateServerToken();
    }
    return (server_token);
}