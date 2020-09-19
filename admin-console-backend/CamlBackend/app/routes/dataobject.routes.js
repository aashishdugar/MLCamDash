module.exports = app => {
    const dataObject = require("../controllers/dataobject.controller.js");

    // Retrieve all DataObject
    app.post("/dataobject/getall", dataObject.findAll);

    // Retrieve a single DataObject with DataObjectId
    app.post("/dataobject/get/:dataObjectId", dataObject.findOne);


};