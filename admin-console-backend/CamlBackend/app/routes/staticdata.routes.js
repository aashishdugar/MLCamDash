module.exports = app => {
    const staticdata = require("../controllers/staticdata.controller.js");
  
    // Retrieve all Static Data
    app.post("/static/getall", staticdata.getStatic);
     
  };