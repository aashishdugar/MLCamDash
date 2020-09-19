const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const WidgetType = function (widgettype) {
    this.id = widgettype.id;
    this.type = widgettype.type;
    this.description = widgettype.description;
};
// Find a single WidgetType with a WidgetTypeId
WidgetType.findById = (widgettypeId, result) => {
    sql.query(`SELECT wt.id,wt.type,wt.description FROM widgettype wt where wt.id = ${widgettypeId}`, (err, res) => {
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
            var errormsg = 'Widget Type Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all WidgetType from the database.
WidgetType.getAll = result => {
    sql.query(" SELECT wt.id,wt.type,wt.description FROM widgettype wt where wt.id ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let resJson = {};
        resJson = sucessJsonList(res, resJson);
        result(null, resJson);
        return;

    }

    );
};


function sucessJsonList(res, resJson) {
    let widgetType = {};
    let widgetTypeList = [];
    for (let i = 0; i < res.length; i++) {
        widgetType = {
            id: res[i].id,
            type: res[i].type,
            description: res[i].description
        }
        widgetTypeList.push(widgetType)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": widgetTypeList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let widgetType = {};
    widgetType = {
        id: res[0].id,
        type: res[0].type,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": widgetType,
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

module.exports = WidgetType;
