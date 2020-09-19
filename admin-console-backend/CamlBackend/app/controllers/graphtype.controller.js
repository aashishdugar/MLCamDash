const GraphType = require("../db/models/graphtype.model.js");



// Retrieve all Graph Type from the database.
exports.findAll = (req, res) => {
    GraphType.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Graph Type with a Graph TypeId
exports.findOne = (req, res) => {
    GraphType.findById(req.params.graphtypeId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

