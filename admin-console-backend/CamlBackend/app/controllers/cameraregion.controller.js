const CameraRegion = require("../db/models/cameraregion.model.js");

// Create and Save a new CameraRegion
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save CameraRegion in the database
    CameraRegion.create(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// // Update and Save a new CameraRegion
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Update CameraRegion in the database
    CameraRegion.update(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};



// Retrieve all CameraRegion from the database.
exports.findAll = (req, res) => {
    CameraRegion.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single CameraRegion using CameraId
exports.findByCameraId = (req, res) => {
    CameraRegion.findByCameraId(req.params.cameraregionId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

// // Find a single CameraRegion with a CameraRegionId
// exports.findOne = (req, res) => {
//     CameraRegion.findById(req.params.cameraRegionId, (err, data) => {
//         if (err) {
//             res.send(data);
//         } else {
//             res.send(data);
//         }
//     });

// };

// Delete a single CameraRegion with a CameraRegionId
exports.delete = (req, res) => {
    CameraRegion.delete(req.params.cameraregionId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};


