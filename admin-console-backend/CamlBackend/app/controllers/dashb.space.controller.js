const influx = require("../db/influxdb.js");
const DashboardSpace = require("../db/models/dashb.space.model.js");


exports.getSpaceDensity = (req, res) => {
    DashboardSpace.spacedensity(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

exports.getSpaceCurrentDensity = (req, res) => {
    DashboardSpace.getSpaceCurrentDensity(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

exports.getSpaceDensityCountByTime = (req, res) => {

    DashboardSpace.getSpaceDensityCountByTime(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};


exports.getSpaceSocialDistanceViolation = (req, res) => {
    DashboardSpace.getSpaceSocialDistanceViolation(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};


// exports.getSpaceCurrentDistanceViolation = (req, res) => {
//     DashboardSpace.getSpaceCurrentDistanceViolation(req.params.spaceId, (err, data) => {
//         if (err) {
//             res.send(data);
//         } else {
//             res.send(data);
//         }
//     });

// };


exports.getSpaceSocialDistanceViolationCountByTime = (req, res) => {

    DashboardSpace.getSpaceSocialDistanceViolationCountByTime(req.body, (err, data) => {
        if (err) {
            res.send(data);
        } else {
            res.send(data);
        }
    });

};

