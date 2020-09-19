module.exports = app => {
    const state = require("../controllers/state.controller.js");
  
    // Retrieve all state
    app.post("/state/getall", state.findAll);
  
    // Retrieve a single state with stateId
    app.post("/state/get/:stateId", state.findOne);

    // Retrieve a Coutry with stateList
    app.post("/state/getcountrystatelist", state.findCountryWithStates);
  
     
  };