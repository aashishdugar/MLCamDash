const WidgetType = require("../db/models/widgettype.model.js");



// Retrieve all Widget Type from the database.
exports.findAll = (req, res) => {
    WidgetType.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Widget Type with a Event StatusId
exports.findOne = (req, res) => {
    WidgetType.findById(req.params.widgettypeId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

