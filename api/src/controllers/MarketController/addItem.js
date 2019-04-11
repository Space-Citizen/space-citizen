var { doQuery, mysqlError } = require('../../database/');

module.exports = function (req, res, next, userId) {
  const { price } = req.body;
  const { itemId } = req.params;
  if (!itemId) {
    res.status(400).json({ error: "Missing paramters" });
    return;
  }
  doQuery("SELECT items.`id` FROM `inventory` INNER JOIN `items` ON inventory.`item_type` = items.`id`\
WHERE inventory.`id` = ? AND inventory.`owner` = ?", [itemId, userId]).then(function (itemInfo) {
    if (itemInfo.length === 0) {
      res.status(500).json({ msg: 'item not found' });
      return;
    }
    itemInfo = itemInfo[0];
    itemType = itemInfo.id;

    doQuery("DELETE FROM `inventory` WHERE `id` = ?", [itemId]).then(function (deleteResult) {
      if (deleteResult.affectedRows === 0) {
        res.status(500).json({ msg: 'An error occured while selling your item' });
        return;
      }

      doQuery(
        'INSERT INTO marketplace(id, item_type, price) VALUES(?, ?, ?)',
        [itemId, itemType, price]).then(function (result) {


          res.status(200).json({ success: 'yay' });
        }, function (error) { mysqlError(res, error) });
    }, function (error) { mysqlError(res, error) });

  }, function (error) { mysqlError(res, error) });
}
