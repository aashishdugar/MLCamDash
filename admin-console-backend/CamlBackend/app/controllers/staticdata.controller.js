const StaticData = require("../db/models/staticdata.model.js");



// Retrieve all Event Type from the database.
exports.getStatic = (req, res) => {
    StaticData.getStatic((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};



