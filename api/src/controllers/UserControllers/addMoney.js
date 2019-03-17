var { increaseBalance } = require('../../balanceFunctions');
// give money to a user
module.exports = function (req, res, next) {
    if (!req.body || !req.body.amount || !req.body.userId) {
        res.status(400).json({ error: "Field(s) missing" });
        return;
    }
    increaseBalance(req.body.userId, req.body.amount).then(response => {
        res.status(200).json({ success: "Balance updated" });
    }).catch(error => {
        res.status(400).json({ error: "An error occured while updating your balance" });
    });
}
