module.exports = app => {
    const spacetype = require("../controllers/spacetype.controller.js");
  
    // Retrieve all space Type
    app.post("/spacetype/getall", spacetype.findAll);
  
    // Retrieve a single space Type with SpaceTypeId
    app.post("/spacetype/get/:spacetypeId", spacetype.findOne);
  
     
  };