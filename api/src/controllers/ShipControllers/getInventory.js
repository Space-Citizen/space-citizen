var { doQuery, mysqlError } = require('../../database/');

// get inventory of a ship
module.exports = function (req, res, next, userId) {
    doQuery("SELECT inventory.id, inventory.item_status, items.id as `item_id`, items.name, items.description, items.specifications, items.icon\
        FROM `inventory` INNER JOIN `items` ON inventory.item_type = items.id AND inventory.used_on_ship = ? AND inventory.owner = ? ORDER BY items.name ASC",
        [req.params.shipId, userId]).then(function (inventory) {
            res.status(200).json(inventory);
        }, function (error) { mysqlError(res, error) });
}