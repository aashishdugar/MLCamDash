const Space = require("../db/models/space.model.js");

// Create and Save a new Space
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   
    // Create a Space
    const space = new Space({
      id: req.body.id,
      name: req.body.name,
      icon: req.body.icon,
      layout: req.body.layout,
 });
    // Save Space in the database
    Space.create(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };

  // Update and Save a new Space
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // Update a Space
    const space = new Space({
      id: req.body.id,
      name: req.body.name,
      icon: req.body.icon,
      layout: req.body.layout,
     });
    // Update Space in the database
    Space.update(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };
  


// Retrieve all space from the database.
exports.findAll = (req, res) => {
    Space.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single space with a spaceId
exports.findOne = (req, res) => {
    Space.findById(req.params.spaceId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

// Delete a single space with a spaceId
exports.delete = (req, res) => {
    Space.delete(req.params.spaceId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

// Find Top Space in Hierachy from the database.
exports.findTopSpace = (req, res) => {
    Space.getTopSpace((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single space details with a spaceId
exports.findSpaceDetails = (req, res) => {
    Space.findSpaceDetails(req.params.spaceId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

exports.findSpaceDetailsList = (req, res) => {
    Space.findSpaceDetailsList((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};


  // Update and Save a Space Status
  exports.updateSpaceStatus = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Update Space in the database
    Space.updateSpaceStatus(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };
  