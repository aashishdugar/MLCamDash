const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const RuleStatus = function (rulestatus) {
    this.id = rulestatus.id;
    this.status = rulestatus.status;
    this.description = rulestatus.description;
};

RuleStatus.findByStatus = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT rs.id from rulestatus rs  where rs.status = "Active" `, function (err, res) {
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

// Find a single CameraStatus with a CameraStatusId
RuleStatus.findById = (rulestatusId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT rs.id,rs.status,rs.description from rulestatus rs  where rs.id = ${rulestatusId}`, (err, res) => {
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



module.exports = RuleStatus;