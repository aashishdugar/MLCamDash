const Camera = require("../db/models/camera.model.js");

// Create and Save a new Camera
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
 
    // Create a Camera
    const camera = new Camera({
      id: req.body.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      specification: req.body.specification,
      ipaddress: req.body.ipaddress
 });
    // Save Camera in the database
    Camera.create(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };

  // Update and Save a new Camera
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // Update a Camera
    const camera = new Camera({
        id: req.body.id,
        name: req.body.name
       
     });
    // Update Camera in the database
    Camera.update(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };
  


// Retrieve all Camera from the database.
exports.findAll = (req, res) => {
    Camera.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Camera with a CameraId
exports.findOne = (req, res) => {
    Camera.findById(req.params.cameraId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

 };

// Delete a single Camera with a CameraId
exports.delete = (req, res) => {
    Camera.delete(req.params.cameraId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};


// Retrive all Camera which have no Space.
exports.getAvailableCamera = (req, res) => {
    Camera.getAvailableCamera((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

 // Set Space to Camera
 exports.assignCamera = (req, res) => {
     // Validate request
     if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }
     
     // Update a Camera
     const camera = new Camera({
         id: req.body.id,
         name: req.body.name
        
      });
     // Update Camera in the database
     Camera.assignCamera(req.body, (err, data) => {
         if (err) {
             res.send(data);
         } else {
             res.send(data);
         }
     });
   };


   
    // Set Space to Camera
 exports.removeCamera = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   
    // Update Camera in the database
    Camera.removeCamera(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };

  // Update and Save a Camera Status
  exports.updateCameraStatus = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Update Camera in the database
    Camera.updateCameraStatus(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
  };
  



