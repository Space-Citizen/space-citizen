
module.exports = function (res, error) {
    console.log("mysql error: ", error);
    res.status(500).json({ error: "The API failed to satisfy your request" });
}