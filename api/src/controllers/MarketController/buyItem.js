var { doQuery } = require('../../database/');
var { reduceBalance } = require('../../balanceFunctions');
var waterfall = require('async-waterfall');

// get item's informations from the api
function getItemInfo(itemId, waterfallNext) {
  doQuery("SELECT id, item_type, price FROM `marketplace` WHERE `id` = ?", [itemId]).then(function (itemInfo) {
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

function addItemToInventory(itemInfo, userId) {
  return doQuery("INSERT INTO `inventory`(item_type, owner) VALUES(?, ?)", [itemInfo.item_type, userId]);
}

function removeFromMarket(itemInfo) {
  return doQuery("DELETE FROM `marketplace` WHERE `id` = ?", [itemInfo.id]);
}

//buy an item
module.exports = function (req, res, next, userId) {
  waterfall([
    function (waterfallNext) {
      // get item information
      getItemInfo(req.params.itemId, waterfallNext);
    },
    function (itemInfo, waterfallNext) {
      // change the user's balance
      reduceBalance(userId, itemInfo.price).then((result) => {
        addItemToInventory(itemInfo, userId).then(function (result) {
          removeFromMarket(itemInfo).then((result) => {
            waterfallNext(null, { success: "Item added to your inventory" });
          })
        }, function (error) { waterfallNext(error) });;
      }).catch((error) => { waterfallNext(error) });
    }
  ],
    function (error, result) {
      if (error) {
        res.status(400).json({ error: error });
        return;
      }
      res.status(200).json(result);
    });
}
