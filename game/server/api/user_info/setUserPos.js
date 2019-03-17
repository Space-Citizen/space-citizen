const { httpPost } = require('../request');
const getServerToken = require('../server_token/getServerToken');

module.exports = function (user_id, map, map_coordinate) {
    const server_token = getServerToken();

    return (new Promise(function (resolve, reject) {
        httpPost(process.env.SPACE_CITIZEN_API_URL + '/api/users/changepos',
            {
                map: map,
                map_coordinate_x: map_coordinate.x,
                map_coordinate_y: map_coordinate.y,
                user_id: user_id
            },
            server_token).then((response) => {
                if (!response || !response.body) {
                    reject("Response body not found");
                    return;
                }
                resolve(response.body);
            }).catch((error) => {
                reject(error);
            });
    }));
}