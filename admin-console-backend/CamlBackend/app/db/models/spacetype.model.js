const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const SpaceType = function (spacetype) {
    this.id = spacetype.id;
    this.type = spacetype.type;
    this.description = spacetype.description;
};
// Find a single SpaceType with a SpaceTypeId
SpaceType.findById = (spacetypeId, result) => {
    sql.query(`SELECT st.id,st.type,st.description FROM spacetype st where st.id = ${spacetypeId}`, (err, res) => {
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
            var errormsg = 'Space Type Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all EventType from the database.
SpaceType.getAll = result => {
    sql.query(" SELECT st.id,st.type,st.description FROM spacetype st where st.id ", (err, res) => {
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
    let spaceType = {};
    spaceType = {
        id: res[0].id,
        type: res[0].type,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": spaceType,
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

module.exports = SpaceType;
