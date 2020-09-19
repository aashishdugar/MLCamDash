const User = require("../db/models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a User
  const user = new User({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    token: req.body.token,
    role: req.body.role.id
   
    
   });
  // Save User in the database
  User.create(user, (err, data) => {
    if (err){
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
    }else{
        res.send(data);
    } 
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err){
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        }
        else{
            res.send(data);
        } 
      });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    //console.log("findOne Request:"+JSON.stringify(req));
    User.findById(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.userId
            });
          }
        } else {
            res.send(data);
        }
      });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
        // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.userId,
        new Customer(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found User with id ${req.params.userId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating User with id " + req.params.userId
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    //console.log("delete Request:"+JSON.stringify(req));
    User.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.userId
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    failJson(res,"Content can not be empty!");
    
  }
  // Login a User
  const user = new User({
    name: req.body.name,
    password: req.body.password,
   });
  // Check User Valid or Not 
  User.login(user, (err, data) => {
    if (err){
      res.send(data);
    }else{
        res.send(data);
    } 
  });
};

function failJson(res,errormsg){
  let  resJson= {};
  resJson={
    "status": "FAIL",
    "data": null,
    "msg": null,
    "errormsg": errormsg,
     
  }
  res.send(resJson);
};
