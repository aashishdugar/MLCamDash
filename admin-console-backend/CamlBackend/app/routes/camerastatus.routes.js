module.exports = app => {
    const camerastatus = require("../controllers/camerastatus.controller.js");
  
    // Retrieve all Camera Status
    app.post("/camerastatus/getall", camerastatus.findAll);
  
    // Retrieve a single Camera Status with CameraStatusId
    app.post("/camerastatus/get/:camerastatusId", camerastatus.findOne);
  
     
  };