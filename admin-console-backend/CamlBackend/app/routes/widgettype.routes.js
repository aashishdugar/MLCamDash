module.exports = app => {
    const widgettype = require("../controllers/widgettype.controller.js");
  
    // Retrieve all Widget Type
    app.post("/widgettype/getall", widgettype.findAll);
  
    // Retrieve a single Widget Type with WidgetTypeId
    app.post("/widgettype/get/:widgettypeId", widgettype.findOne);
  
     
  };