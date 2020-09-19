const EventStatus = require("../db/models/eventstatus.model.js");



// Retrieve all Event Status from the database.
exports.findAll = (req, res) => {
    EventStatus.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Event Status with a Event StatusId
exports.findOne = (req, res) => {
    EventStatus.findById(req.params.eventstatusId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

