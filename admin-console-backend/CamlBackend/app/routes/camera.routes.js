module.exports = app => {
  const camera = require("../controllers/camera.controller.js");

  // Create a Camera
  app.post("/camera/create", camera.create);

  // Update a Camera
  app.post("/camera/update", camera.update);

  // Delete a Camera
  app.post("/camera/delete/:cameraId", camera.delete);

  // Retrieve all Camera
  app.post("/camera/getall", camera.findAll);

  // Retrieve a single Camera with CameraId
  app.post("/camera/get/:cameraId", camera.findOne);

  // Retrieve a Availble CameraList
  app.post("/camera/getavailablecamera", camera.getAvailableCamera);

  // Assign a Camera
  app.post("/camera/assigncamera", camera.assignCamera);

  app.post("/camera/removecamera", camera.removeCamera);

  // Update a CameraStatus
  app.post("/camera/updatestatus", camera.updateCameraStatus);







};