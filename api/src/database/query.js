
module.exports = function (query, parameters) {
    return new Promise(function (resolve, reject) {
        db.query(query, parameters, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}