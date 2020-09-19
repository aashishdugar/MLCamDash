const SpaceType = require("../db/models/spacetype.model.js");



// Retrieve all space Type from the database.
exports.findAll = (req, res) => {
    SpaceType.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single space Type with a space TypeId
exports.findOne = (req, res) => {
    SpaceType.findById(req.params.spacetypeId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

