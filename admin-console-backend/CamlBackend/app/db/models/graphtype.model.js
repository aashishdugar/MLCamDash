const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const GraphType = function (graphtype) {
    this.id = graphtype.id;
    this.type = graphtype.type;
    this.description = graphtype.description;
};
// Find a single GraphType with a GraphTypeId
GraphType.findById = (graphtypeId, result) => {
    sql.query(`SELECT gt.id,gt.type,gt.description FROM graphtype gt where gt.id = ${graphtypeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let resJson = {};
        if (res.length) {
            resJson = sucessJson(res, resJson)
            result(null, resJson);
            return;
        } else {
            var errormsg = 'Graph Type Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all GraphType from the database.
GraphType.getAll = result => {
    sql.query(" SELECT gt.id,gt.type,gt.description FROM graphtype gt where gt.id ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Graph Type: ", JSON.stringify(res));
        let resJson = {};
        resJson = sucessJsonList(res, resJson);
        result(null, resJson);
        return;

    }

    );
};


function sucessJsonList(res, resJson) {
    let graphType = {};
    let graphTypeList = [];
    for (let i = 0; i < res.length; i++) {
        graphType = {
            id: res[i].id,
            type: res[i].type,
            description: res[i].description
        }
        graphTypeList.push(graphType)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": graphTypeList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let graphType = {};
    graphType = {
        id: res[0].id,
        type: res[0].type,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": graphType,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function failJson(resJson, errormsg) {
    let data = {};
    resJson = {
        "status": "FAIL",
        "data": null,
        "msg": null,
        "errormsg": errormsg,

    }
    return resJson;
};

module.exports = GraphType;
