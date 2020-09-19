const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const CameraStatus = function (camerastatus) {
    this.id = camerastatus.id;
    this.status = camerastatus.status;
    this.description = camerastatus.description;
};
// Find a single CameraStatus with a CameraStatusId
CameraStatus.findById = (camerastatusId, result) => {
    sql.query(`SELECT cs.id,cs.status,cs.description FROM camerastatus cs where cs.id = ${camerastatusId}`, (err, res) => {
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
            var errormsg = 'Camera Status Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all CameraStatus from the database.
CameraStatus.getAll = result => {
    sql.query(" SELECT cs.id,cs.status,cs.description FROM camerastatus cs where cs.id ", (err, res) => {
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

CameraStatus.findByStatus = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT cs.id from camerastatus cs  where cs.status = "Inactive" `, function (err, res) {
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


function sucessJsonList(res, resJson) {
    let cameraStatus = {};
    let cameraStatusList = [];
    for (let i = 0; i < res.length; i++) {
        cameraStatus = {
            id: res[i].id,
            status: res[i].status,
            description: res[i].description
        }
        cameraStatusList.push(cameraStatus)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": cameraStatusList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let cameraStatus = {};
    cameraStatus = {
        id: res[0].id,
        status: res[0].status,
        description: res[0].description
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": cameraStatus,
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

// Find a single CameraStatus with a CameraStatusId
CameraStatus.getById = (camerastatusId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT cs.id from camerastatus cs
         where cs.id = ${camerastatusId}`, (err, res) => {
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

module.exports = CameraStatus;
