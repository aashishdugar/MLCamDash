const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const TrackingMethod = function (trackingmethod) {
    this.id = trackingmethod.id;
    this.name = trackingmethod.name;
    this.description = trackingmethod.description;
};

// Find a single TrackingMethod with a TrackingMethod Id
TrackingMethod.isTrackingMethodExits = (trackingMethodId) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select tm.id,tm.name,tm.description from trackingmethod tm
        where tm.id = ${trackingMethodId}`, (err, res) => {
            if (err) {
                sql.rollback(function () {
                    reject(error);
                });
            }
            if (!res.length) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    });

};


module.exports = TrackingMethod;