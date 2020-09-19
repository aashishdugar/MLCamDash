
module.exports = app => {
    const country = require("../controllers/country.controller.js");
  
    // Retrieve all country
    app.post("/country/getall", country.findAll);
  
    // Retrieve a single country with countryId
    app.post("/country/get/:countryId", country.findOne);
  
     
  };