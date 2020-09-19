const Rule = require("../db/models/rule.model.js");

// Create and Save a new Rule
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Save Rule in the database
    Rule.create(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

// Update and Save a new Rule
exports.update = (req, res) => {
    // console.log("Rule Input :"+ JSON.stringify(req.body));
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Update Rule in the database
    Rule.update(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};



// Retrieve all Rule from the database.
exports.findAll = (req, res) => {
    Rule.getAll((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

//Find a single Rule with a RuleId
exports.findOne = (req, res) => {
    Rule.findById(req.params.ruleId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

// Delete a single Rule with a RuleId
exports.delete = (req, res) => {
    Rule.delete(req.params.ruleId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

// Retrieve all Rule from the database.
exports.getAllSimplified = (req, res) => {
    Rule.getAllSimplified((err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

//Find a single Rule with a RuleId
exports.getSimplified = (req, res) => {
    Rule.getSimplified(req.params.ruleId, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};
// Update and Save a Rule Status
exports.updateRuleStatus = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Update Rule in the database
    Rule.updateRuleStatus(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });
};

