var { doQuery, mysqlError } = require('../../database/');

// get user's items
module.exports = function (req, res, next, userId) {
    //get items in user inventory
    doQuery("SELECT inventory.id, inventory.item_status, items.id as `item_id`, items.name, items.description, items.price, items.specifications, items.icon\
         FROM `inventory` INNER JOIN `items` ON inventory.item_type = items.id AND inventory.owner = ? AND inventory.used_on_ship IS NULL ORDER BY items.name ASC",
        [userId]).then(function (inventory) {
            res.status(200).json(inventory);
        }, function (error) { mysqlError(res, error) });;
}
