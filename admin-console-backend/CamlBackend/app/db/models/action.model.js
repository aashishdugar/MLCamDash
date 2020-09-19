const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const Action = function (action) {
    this.id = action.id;
    this.name = action.name
};

Action.getActionList = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT a.id as actionid,a.name as actionname,a.command as actionacommand,a.eventtype as eventtype,  et.id as eventtypeid,et.type as eventtype,et.description as eventtypedescription, r.id as ruleid,r.name as rulename FROM action a  left join eventtype et on a.eventtype=et.id  left join rule r on a.rule=r.id `, function (err, res) {
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

Action.findByRule = (ruleId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT a.id as actionid,a.name as actionname,a.command as actionacommand,a.eventtype as eventtype,  et.id as eventtypeid,et.type as eventtype,et.description as eventtypedescription, r.id as ruleid,r.name as rulename FROM action a
        left join eventtype et on a.eventtype=et.id  left join rule r on a.rule=r.id where
         a.rule = ${ruleId}`, function (err, res) {
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

module.exports = Action;