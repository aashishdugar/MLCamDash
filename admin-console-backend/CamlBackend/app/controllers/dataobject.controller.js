const DataObject = require("../db/models/dataobject.model.js");




// Retrieve all DataObject from the database.
exports.findAll = (req, res) => {
    DataObject.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single DataObject with a DataObjectId
exports.findOne = (req, res) => {
    DataObject.findById(req.params.dataObjectId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

