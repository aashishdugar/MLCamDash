module.exports = app => {
    const space = require("../controllers/space.controller.js");

    // Create a space
    app.post("/space/create", space.create);

    // Update a space
    app.post("/space/update", space.update);

    // Delete a space
    app.post("/space/delete/:spaceId", space.delete);
  
    // Retrieve all space
    app.post("/space/getall", space.findAll);
  
    // Retrieve a single space with SpaceId
    app.post("/space/get/:spaceId", space.findOne);

    // Get Top Level Space
    app.post("/space/gettop", space.findTopSpace);

    // Retrieve a single space with SpaceId
    app.post("/space/getdetails/:spaceId", space.findSpaceDetails);

    // Retrieve all space
    app.post("/space/gethierarchy", space.findSpaceDetailsList);

    // Update a spaceStatus
    app.post("/space/updatestatus", space.updateSpaceStatus);

    

   
     
  };