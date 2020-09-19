const State = require("../db/models/state.model.js");



// Retrieve all State from the database.
exports.findAll = (req, res) => {
    State.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Find a single State with a StateId
exports.findOne = (req, res) => {
    State.findById(req.params.stateId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};


// Find a single State with a StateId
exports.findCountryWithStates = (req, res) => {
    State.findCountryWithStates((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};