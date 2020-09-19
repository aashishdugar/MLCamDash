module.exports = app => {
    const graphtype = require("../controllers/graphtype.controller.js");
  
    // Retrieve all Graph Type
    app.post("/graphtype/getall", graphtype.findAll);
  
    // Retrieve a single Graph Type with GraphId
    app.post("/graphtype/get/:graphtypeId", graphtype.findOne);
  
     
  };