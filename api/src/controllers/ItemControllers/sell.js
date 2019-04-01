var { doQuery } = require('../../database/');
var waterfall = require('async-waterfall');
var { increaseBalance } = require('../../balanceFunctions');

function getItemInfo(itemId, userId, waterfallNext) {
  doQuery("SELECT items.`price` FROM `inventory` INNER JOIN `items` ON inventory.`item_type` = items.`id`\
WHERE inventory.`id` = ? AND inventory.`owner` = ?", [itemId, userId]).then(function (itemInfo) {
    if (itemInfo.length === 0) {
      waterfallNext("Item not found");
      return;
    }
    //get first element in array
    itemInfo = itemInfo[0];
    // call next function
    waterfallNext(null, itemInfo);
  }, function (error) { waterfallNext(error) });
}

function deleteItemFromInventory(itemId, itemInfo, waterfallNext) {
  doQuery("DELETE FROM `inventory` WHERE `id` = ?", [itemId]).then(function (deleteResult) {
    if (deleteResult.affectedRows === 0) {
      waterfallNext("An error occured while selling your item");
      return;
    }
    waterfallNext(null, itemInfo);
  }, function (error) { waterfallNext(error) });
}

function addToMarket(itemId, itemInfo, userId, waterfallNext) {
  doQuery("INSERT INTO `market`(name, description, price, specifications, icon, seller), VALUES(?,?,?,?,?,?)",
  [itemInfo.name, itemInfo.description, itemInfo.price, itemInfo.specifications, itemInfo.icon, userId]).then((err, res) => {
    if (err) throw err;
    waterfallNext(null, itemInfo);
  }, function (error) { waterfallNext(error) });
}

//get item info
module.exports = function (req, res, next, userId) {
  // check paramters
  if (!req.params.itemId) {
    res.status(400).json({ error: "Missing paramters" });
    return;
  }
  waterfall([
    function (waterfallNext) {
      // get informations about the item (price ..)
      getItemInfo(req.params.itemId, userId, waterfallNext);
    },
    function (itemInfo, waterfallNext) {
      // add item to market
      addToMarket(req.params.itemId, itemInfo, userId, waterfallNext);
    },
    function (itemInfo, waterfallNext) {
      // delete the item from the inventory
      deleteItemFromInventory(req.params.itemId, itemInfo, waterfallNext);
    },
    function (itemInfo, waterfallNext) {
      // update the user's balance
      // increase the balance by half the price of the item
      increaseBalance(userId, itemInfo.price / 2).then((result) => {
        waterfallNext(null, "Item sold for " + itemInfo.price / 2);
      }).catch((error) => { waterfallNext(error) })
    }
  ], function (error, result) {
    if (error) {
      res.status(400).json({ error: error });
      return;
    }
    res.status(200).json({ success: result });
  });
}
