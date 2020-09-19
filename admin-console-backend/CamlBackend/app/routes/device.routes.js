module.exports = app => {
    const device = require("../controllers/device.controller.js");

    // Create a Device
    app.post("/device/create", device.create);

    // Update a Device
    app.post("/device/update", device.update);

    // Delete a Device
    app.post("/device/delete/:deviceId", device.delete);
  
    // Retrieve all Device
    app.post("/device/getall", device.findAll);
  
    // Retrieve a single Device with DeviceId
    app.post("/device/get/:deviceId", device.findOne);

   
     
  };