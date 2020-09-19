const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const RuleConfigObject = function (ruleconfigobject) {
    this.id = ruleconfigobject.id;
   
};

RuleConfigObject.getRuleConfigObjectList = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT rco.id,rco.rule,rco.configobject,co.id as configobjectid,co.name as configobjectname,co.description as configobjectdescription FROM ruleconfigobject rco left join configobject co on rco.configobject =co.id `, function (err, res) {
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

RuleConfigObject.findByRule = (ruleId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT rco.id,rco.rule,rco.configobject,co.id as configobjectid,co.name as configobjectname,co.description as configobjectdescription FROM ruleconfigobject rco left join configobject co on rco.configobject =co.id
         where rco.rule = ${ruleId}`, function (err, res) {
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

module.exports = RuleConfigObject;