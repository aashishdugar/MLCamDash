const sql = require("../db.js");
const { json } = require("body-parser");
const Camera = require("./camera.model.js");

// constructor
const CameraRegion = function (cameraRegion) {
    this.id = cameraRegion.id;
};

/* CameraRegion Create Validator */
function createValidate(newCameraRegion, resJson) {
    if (null == newCameraRegion) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCameraRegion.id) {
        var errormsg = 'Camera Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (newCameraRegion.length == 0) {
        var errormsg = 'RegionList Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else {
        for (let i = 0; i < newCameraRegion.regionList.length; i++) {
            if (!newCameraRegion.regionList[i].x1) {
                var errormsg = 'X1 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].x2) {
                var errormsg = 'X2 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].y1) {
                var errormsg = 'Y1 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].y2) {
                var errormsg = 'Y2 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

        }
    }
}

/* CameraRegion Update Validator */
function updateValidate(newCameraRegion, resJson) {
    if (null == newCameraRegion) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCameraRegion.id) {
        var errormsg = 'Camera Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (newCameraRegion.length == 0) {
        var errormsg = 'RegionList Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else {
        for (let i = 0; i < newCameraRegion.regionList.length; i++) {
            if (!newCameraRegion.regionList[i].id) {
                var errormsg = 'CameraRegion Id Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].x1) {
                var errormsg = 'X1 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].x2) {
                var errormsg = 'X2 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].y1) {
                var errormsg = 'Y1 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newCameraRegion.regionList[i].y2) {
                var errormsg = 'Y2 Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

        }
    }
}
/* Create CameraRegion Details */
CameraRegion.create = (newCameraRegion, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = createValidate(newCameraRegion, resJson);
    if (resJson) {
        result(null, resJson);
        return;
    }
    /*Check Camera is in System  */
    Camera.getCamera(newCameraRegion.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Camera Details Not Found in System';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;
            } else {
                /*Create CameraRegion is in System  */
                createCameraRegionDetails(newCameraRegion, resJson, result);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

/* Update CameraRegion Details */
CameraRegion.update = (newCameraRegion, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateValidate(newCameraRegion, resJson);
    if (resJson) {
        result(null, resJson);
        return;
    }
    /*Check Camera is in System  */
    Camera.getCamera(newCameraRegion.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Camera Details Not Found in System';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;
            } else {
                updateCameraRegionDetails(newCameraRegion, resJson, result);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};


function createCameraRegionDetails(newCameraRegion, resJson, result) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        let regionList1 = [];
        regionList1 = getCameraData(newCameraRegion, regionList1);
        for (let i = 0; i < regionList1.length; i++) {
            sql.query("INSERT INTO cameraregion  SET ?", regionList1[i], function (err, res) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
            });
        }
        /* Get New Created Camera using Camera Id*/
        var msg = "CameraRegion Created Successfully"
        getCameraRegion(newCameraRegion, resJson, msg, result);
    })


}

function getCameraRegion(newCameraRegion, resJson, msg, result) {
    /* Get New Created Camera using Camera Id*/
    sql.query(` select cr.id,cr.x1,cr.x2,cr.y1,cr.y2, c.id as cameraid,c.name as cameraname from cameraregion cr left join camera c on cr.camera = c.id 
     where c.id   = ${newCameraRegion.id}`, function (err, res) {
        if (err) {
            console.log("eror " + JSON.stringify(err));
            sql.rollback(function () {
                throw err;
            });
        }
        if (res.length) {
            resJson = sucessJson(res, resJson, msg, newCameraRegion.id);

        } else {
            var errormsg = 'CameraRegion Not Found for Id';
            resJson = failJson(resJson, errormsg)
        }

        sql.commit(function (err) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            }
            result(null, resJson);
            return;

        });
    });

}

function updateCameraRegionDetails(newCameraRegion, resJson, result) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        let regionList1 = [];
        regionList1 = getCameraData(newCameraRegion, regionList1);
        for (let i = 0; i < regionList1.length; i++) {
            sql.query("UPDATE cameraregion SET camera = ?, x1 = ?, x2 = ?, y1 = ?, y2 = ? WHERE id = ?", [regionList1[i].camera, regionList1[i].x1, regionList1[i].x2, regionList1[i].y1, regionList1[i].y2, regionList1[i].id], function (err, res) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                    result(null, err);
                    return;
                }
            });
        }
        var msg = "CameraRegion Update Successfully"
        getCameraRegion(newCameraRegion, resJson, msg, result);
    })
}
/* Delete CameraRegion Details */
CameraRegion.delete = (cameraregionId, result) => {
    let resJson = {};
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /*Check CameraRegion is in System  */
        CameraRegion.getCameraRegion(cameraregionId)
            .then((answer) => {
                if (!answer) {
                    var errormsg = 'CameraRegion Details Not Found in System';
                    resJson = failJson(resJson, errormsg)
                    result(null, resJson);
                    return;
                } else {
                    sql.query("DELETE FROM cameraregion WHERE id = ?", cameraregionId, function (err, res) {
                        if (err) {
                            sql.rollback(function () {
                                throw err;
                            });
                        }
                    });

                    /* Construct Success Json */
                    resJson = deleteSuccessJson(resJson)
                    sql.commit(function (err) {
                        if (err) {
                            sql.rollback(function () {
                                throw err;
                            });
                        }
                        result(null, resJson);
                        return;

                    });
                }
            })
            // similar to "catch"
            .catch((error) => {
                console.log("error", error);
            });
    })
};

/* Create Json for delete CameraRegion */
function deleteSuccessJson(resJson) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": null,
        "msg": "CameraRegion Deleted Successfully",
        "errormsg": "",

    }
    return resJson;
};

CameraRegion.getCameraRegion = (cameraregionId) => {
    return new Promise((resolve, reject) => {
        sql.query(` select cr.id,cr.x1,cr.x2,cr.y1,cr.y2, c.id as cameraid,c.name as cameraname from cameraregion cr left join camera c on cr.camera = c.id 
        where cr.id = ${cameraregionId}`, function (err, res) {
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

/* Get Camera Object */
function getCameraData(newCameraRegion, regionList1) {
    let cameraRegionData = {};
    for (let i = 0; i < newCameraRegion.regionList.length; i++) {
        cameraRegionData = {
            id: newCameraRegion.regionList[i].id,
            camera: newCameraRegion.id,
            x1: newCameraRegion.regionList[i].x1,
            x2: newCameraRegion.regionList[i].x2,
            y1: newCameraRegion.regionList[i].y1,
            y2: newCameraRegion.regionList[i].y2
        }
        regionList1.push(cameraRegionData);
    }

    return regionList1;
}

// Retrieve all CameraRegion from the database.
CameraRegion.getAll = result => {
    sql.query("  select cr.id,cr.x1,cr.x2,cr.y1,cr.y2, c.id as cameraid,c.name as cameraname from cameraregion cr left join camera c on cr.camera = c.id order by c.id ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let resJson = {};
        var msg = 'CameraRegion List Feached Successfully';
        resJson = sucessJsonList(res, resJson, msg);
        result(null, resJson);
        return;
    }
    );
};

/* Update Camera Details */
CameraRegion.findByCameraId = (cameraregionId, result) => {
    let resJson = {};
    /*Check Device is in System  */
    Camera.getCamera(cameraregionId)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Camera Details Not Found in System';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;
            } else {
                getByCameraId(answer[0].name, cameraregionId, resJson, result);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};

function getByCameraId(cameraName, cameraregionId, resJson, result) {
    /* Get New Created Camera using Camera Id*/
    sql.query(` select cr.id,cr.x1,cr.x2,cr.y1,cr.y2, c.id as cameraid,c.name as cameraname from cameraregion cr left join camera c on cr.camera = c.id 
     where c.id   = ${cameraregionId}`, function (err, res) {
        if (err) {
            console.log("eror " + JSON.stringify(err));
            sql.rollback(function () {
                throw err;
            });
        }


        var msg = "CameraRegion Featched Successfully"

        resJson = sucessJson(res, resJson, msg, cameraregionId, cameraName);
        result(null, resJson);
        return;
    });


}

//* Create Json for Suceess CameraRegion List */
function sucessJsonList(res, resJson, msg) {
    let cameraList = [];
    for (let i = 0; i < res.length; i++) {
        let cameradata = cameraList.find(obj => obj.id == res[i].cameraid);
        if (cameradata) {
            let cameraDetails = cameraList.find(obj => obj.id == res[i].cameraid);
            let region = {};
            region = {
                id: res[i].id,
                x1: res[i].x1,
                x2: res[i].x2,
                y1: res[i].y1,
                y2: res[i].y2
            }
            cameraDetails.regionList.push(region);
        } else {
            let regionList = [];
            let region = {};
            let camera = {};
            region = {
                id: res[i].id,
                x1: res[i].x1,
                x2: res[i].x2,
                y1: res[i].y1,
                y2: res[i].y2
            }
            regionList.push(region);
            camera = {
                id: res[i].cameraid,
                name: res[i].cameraname,
                regionList: regionList
            }
            cameraList.push(camera);
        }
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": cameraList,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};
/* Create Json for Fail Device */
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

//* Create Json for Suceess CameraRegion List */
function sucessJson(res, resJson, msg, cameraid, cameraName) {
    let cameraList = [];
    let camera = {};
    let regionList = [];
    if (res.length == 0) {
        camera = {
            id: cameraid,
            name: cameraName,
            regionList: regionList
        }
    } else {
        for (let i = 0; i < res.length; i++) {
            let cameradata = cameraList.find(obj => obj.id == res[i].cameraid);
            if (cameradata) {
                let cameraDetails = cameraList.find(obj => obj.id == res[i].cameraid);
                let region = {};
                region = {
                    id: res[i].id,
                    x1: res[i].x1,
                    x2: res[i].x2,
                    y1: res[i].y1,
                    y2: res[i].y2
                }
                cameraDetails.regionList.push(region);
            } else {

                let region = {};

                region = {
                    id: res[i].id,
                    x1: res[i].x1,
                    x2: res[i].x2,
                    y1: res[i].y1,
                    y2: res[i].y2
                }
                regionList.push(region);
                camera = {
                    id: res[i].cameraid,
                    name: res[i].cameraname,
                    regionList: regionList
                }
                cameraList.push(camera);
            }
        }
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": camera,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};
/* Create Json for Fail Device */
function failJson(resJson, errormsg) {
    let data = {};
    resJson = {
        "status": "FAIL",
        "data": null,
        "msg": null,
        "errormsg": errormsg
    }
    return resJson;
};

CameraRegion.findByCamera = (cameraId) => {
    return new Promise((resolve, reject) => {
        sql.query(`select cr.id,cr.x1,cr.x2,cr.y1,cr.y2, c.id as cameraid,c.name as cameraname from cameraregion cr left join camera c on cr.camera = c.id 
        where c.id   = ${cameraId}`, function (err, res) {
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

module.exports = CameraRegion;
