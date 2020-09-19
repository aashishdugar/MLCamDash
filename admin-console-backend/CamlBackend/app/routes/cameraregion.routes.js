module.exports = app => {
    const cameraRegion = require("../controllers/cameraregion.controller.js");

    // Create a cameraRegion
    app.post("/cameraregion/create", cameraRegion.create);

    // Update a cameraRegion
    app.post("/cameraregion/update", cameraRegion.update);

    // Delete a cameraRegion
    app.post("/cameraregion/delete/:cameraregionId", cameraRegion.delete);

    // Retrieve all cameraRegion
    app.post("/cameraregion/getall", cameraRegion.findAll);

    // Retrieve all cameraRegion By CameraId
    app.post("/cameraregion/findbycamera/:cameraregionId", cameraRegion.findByCameraId);



};