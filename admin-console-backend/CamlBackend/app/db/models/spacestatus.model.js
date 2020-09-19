const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const SpaceStatus = function (spacestatus) {
    this.id = spacestatus.id;
    this.status = spacestatus.status;
    this.description = spacestatus.description;
};

SpaceStatus.findByStatus = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT ss.id from spacestatus ss  where ss.status = "Inactive" `, function (err, res) {
            if (err) {
                sql.rollback(function () {
                    reject(error);
                });
            }
            if (!res.length) {
                resolve('');
            } else {
                resolve(res);
            }
        })
    });

};

// Find a single SpaceStatus with a SpaceStatusId
SpaceStatus.findById = (spaceStatusId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ss.id,ss.status,ss.description from spacestatus ss  where ss.id = ${spaceStatusId}`, (err, res) => {
            if (err) {
                sql.rollback(function () {
                    reject(error);
                });
            }
            if (!res.length) {
                resolve('');
            } else {
                resolve(res);
            }
        })
    });

};



module.exports = SpaceStatus;