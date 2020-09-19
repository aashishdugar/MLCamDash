const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const GenricSpace = function (genricSpace) {
    this.id = rule.genricSpace
};

GenricSpace.isSpaceExits = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(`select sp.id from space sp
     where sp.id = ${spaceId}`, function (err, res) {
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


module.exports = GenricSpace;