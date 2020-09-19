
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new user
    app.post("/users/create", users.create);
  
    // Retrieve all users
    app.post("/users/getall", users.findAll);
  
    // Retrieve a single user with userId
    app.post("/users/get/:userId", users.findOne);
  
    // Update a user with userId
    app.post("/users/update/:userId", users.update);
  
    // Delete a user with userId
    app.post("/users/delete/:userId", users.delete);

    // Login a user with UserName and Password
    app.post("/users/login", users.login);
     
  };