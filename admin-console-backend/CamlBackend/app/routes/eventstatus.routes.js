module.exports = app => {
    const eventstatus = require("../controllers/eventstatus.controller.js");
  
    // Retrieve all Event Status
    app.post("/eventstatus/getall", eventstatus.findAll);
  
    // Retrieve a single Event Status with EventStatusId
    app.post("/eventstatus/get/:eventstatusId", eventstatus.findOne);
  
     
  };