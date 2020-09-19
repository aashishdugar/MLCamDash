const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const Expression = function (expression) {
    this.id = expression.id;
   
};

Expression.findByRule = (ruleId) => {
    return new Promise((resolve, reject) => {
        sql.query(`select e.id,e.name,e.value,r.id as ruleid,r.name as rulename,op.id as operationsid,op.name as operationsname,op.label as operationslable,co.id as configobjectid,co.name configobjectname,co.description as configobjectdescription,coa.id as configobjectattributeid,coa.description as configobjectattributedescription,dt.id as datatypesid,dt.name as datatypesname FROM expression e  left join rule r on e.rule =r.id left join operations op on e.operations =op.id left join configobject co on e.configobject =co.id left join configobjectattribute coa on e.attribute =coa.id left join datatypes dt on coa.datatype =dt.id
         where r.id = ${ruleId}`, function (err, res) {
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

Expression.getExpressionList = () => {
    return new Promise((resolve, reject) => {

        sql.query(`select e.id,e.name,e.value,r.id as ruleid,r.name as rulename,op.id as operationsid,op.name as operationsname,op.label as operationslable,co.id as configobjectid,co.name configobjectname,co.description as configobjectdescription,coa.id as configobjectattributeid,coa.description as configobjectattributedescription,dt.id as datatypesid,dt.name as datatypesname FROM expression e  left join rule r on e.rule =r.id left join operations op on e.operations =op.id left join configobject co on e.configobject =co.id left join configobjectattribute coa on e.attribute =coa.id left join datatypes dt on coa.datatype =dt.id
        `, function (err, res) {
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

module.exports = Expression;