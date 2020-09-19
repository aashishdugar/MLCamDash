const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const EventType = function (eventtype) {
    this.id = eventtype.id;
    this.type = eventtype.type;
    this.description = eventtype.description;
};
// Find a single EventType with a EventTypeId
EventType.findById = (eventtypeId, result) => {
    sql.query(`SELECT et.id,et.type,et.description FROM eventtype et where et.id = ${eventtypeId}`, (err, res) => {
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
            var errormsg = 'Event Type Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all EventType from the database.
EventType.getAll = result => {
    sql.query(" SELECT et.id,et.type,et.description FROM eventtype et where et.id ", (err, res) => {
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
    let eventType = {};
    let eventTypeList = [];
    for (let i = 0; i < res.length; i++) {
        eventType = {
            id: res[i].id,
            type: res[i].type,
            description: res[i].description
        }
        eventTypeList.push(eventType)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": eventTypeList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let eventType = {};
    eventType = {
        id: res[0].id,
        type: res[0].type,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": eventType,
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

module.exports = EventType;
