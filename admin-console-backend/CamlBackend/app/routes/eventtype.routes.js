module.exports = app => {
    const eventtype = require("../controllers/eventtype.controller.js");
  
    // Retrieve all Event Type
    app.post("/eventtype/getall", eventtype.findAll);
  
    // Retrieve a single Event Type with EventTypeId
    app.post("/eventtype/get/:eventtypeId", eventtype.findOne);
  
     
  };