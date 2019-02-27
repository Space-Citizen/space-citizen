const { httpPost } = require('./request');

module.exports = function (token, map, map_coordinate) {
    return (new Promise(function (resolve, reject) {
        httpPost(process.env.SPACE_CITIZEN_API_URL + '/api/me/changepos',
            { map: map, map_coordinate_x: map_coordinate.x, map_coordinate_y: map_coordinate.y }, token).then((response) => {
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