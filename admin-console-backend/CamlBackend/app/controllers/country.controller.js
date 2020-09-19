const Country = require("../db/models/country.model.js");



// Retrieve all Country from the database.
exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single Country with a CountryId
exports.findOne = (req, res) => {
    Country.findById(req.params.countryId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};



