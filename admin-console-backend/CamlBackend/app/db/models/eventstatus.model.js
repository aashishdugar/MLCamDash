const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const EventStatus = function (eventstatus) {
    this.id = eventstatus.id;
    this.status = eventstatus.status;
    this.description = eventstatus.description;
};
// Find a single EventStatus with a EventStatusId
EventStatus.findById = (eventstatusId, result) => {
    sql.query(`SELECT es.id,es.status,es.description FROM eventstatus es where es.id = ${eventstatusId}`, (err, res) => {
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
            var errormsg = 'Event Status Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all EventStatus from the database.
EventStatus.getAll = result => {
    sql.query(" SELECT es.id,es.status,es.description FROM eventstatus es where es.id ", (err, res) => {
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
    let eventStatus = {};
    let eventStatusList = [];
    for (let i = 0; i < res.length; i++) {
        eventStatus = {
            id: res[i].id,
            status: res[i].status,
            description: res[i].description
        }
        eventStatusList.push(eventStatus)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": eventStatusList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let eventStatus = {};
    eventStatus = {
        id: res[0].id,
        status: res[0].status,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": eventStatus,
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

module.exports = EventStatus;
