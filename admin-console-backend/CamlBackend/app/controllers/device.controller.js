const Device = require("../db/models/device.model.js");

// Create and Save a new Device
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   
    // Create a Device
    const device = new Device({
      id: req.body.id,
      name: req.body.name,
      icon: req.body.icon,
      layout: req.body.layout,
 });
    // Save Device in the database
    Device.create(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };

  // Update and Save a new Device
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // Update a Device
    const device = new Device({
        id: req.body.id,
        name: req.body.name
       
     });
    // Update Device in the database
    Device.update(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };
  


// Retrieve all Device from the database.
exports.findAll = (req, res) => {
    Device.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Device with a DeviceId
exports.findOne = (req, res) => {
    Device.findById(req.params.deviceId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

 };

// Delete a single Device with a DeviceId
exports.delete = (req, res) => {
    Device.delete(req.params.deviceId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};
