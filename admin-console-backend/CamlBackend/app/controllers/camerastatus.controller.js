const CameraStatus = require("../db/models/camerastatus.model.js");



// Retrieve all Camera Status from the database.
exports.findAll = (req, res) => {
    CameraStatus.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Camera Status with a CameraStatusId
exports.findOne = (req, res) => {
    CameraStatus.findById(req.params.camerastatusId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

