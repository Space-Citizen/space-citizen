var { doQuery, mysqlError } = require('../../database/');

// get user's items
module.exports = function (req, res, next) {
  //get items in user inventory
  doQuery("SELECT marketplace.id, marketplace.item_type, items.id as `item_id`, items.name, items.description, marketplace.price, items.specifications, items.icon\
         FROM `marketplace` INNER JOIN `items` ON marketplace.item_type = items.id ORDER BY items.name ASC").then(function (items) {
      res.status(200).json(items);
    }, function (error) { mysqlError(res, error) });;
}
