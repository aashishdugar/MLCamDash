const EventType = require("../db/models/eventtype.model.js");



// Retrieve all Event Type from the database.
exports.findAll = (req, res) => {
    EventType.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Event Type with a Event TypeId
exports.findOne = (req, res) => {
    EventType.findById(req.params.eventtypeId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

