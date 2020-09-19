const sql = require("../db.js");
const { json } = require("body-parser");
const Device = require("./device.model.js");
const Space = require("./space.model.js");
const CameraStatus = require("./camerastatus.model.js");
const CameraRegion = require("./cameraregion.model.js");
const TrackingMethod = require("./trackingmethod.model.js");
const { create } = require("./device.model.js");



// constructor
const Camera = function (camera) {
    this.id = camera.id;
    this.name = camera.name
};

/* Update Camera Details */
Camera.create = (newCamera, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = createValidate(newCamera, resJson);
    if (resJson) {
        result1(null, resJson);
        return;
    }
    /*Check Device is in System  */
    Device.isDeviceExits(newCamera.device.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Device Not Found ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;
            } else {
                isValidSpaceDetailsCreate(newCamera, resJson, result1);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};

function createCameraDetails(newCamera, resJson, result1) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }

        if (null != newCamera.trackingMethod && '' != newCamera.trackingMethod) {
            /* If Camera has TrackingMethod */
            TrackingMethod.isTrackingMethodExits(newCamera.trackingMethod.id)
                .then((answer) => {
                    if (!answer) {
                        /* TrackingMethod Incorrect */
                        var errormsg = 'Tracking Method Not Found in System ';
                        resJson = failJson(resJson, errormsg)
                        result1(null, resJson);
                        return;
                    } else {
                        /* TrackingMethod Correct */
                        createCameraData(newCamera, resJson, result1);
                    }
                })
        } else {
            /* If Camera has no  TrackingMethod */
            createCameraData(newCamera, resJson, result1);
        }
    });
}

function createCameraData(newCamera, resJson, result1) {
    CameraStatus.findByStatus()
        .then((answer) => {
            var camerastatus = null;
            if (answer) {
                camerastatus = answer[0].id
                let cameraData = {};
                cameraData = getCameraData(newCamera, cameraData, camerastatus);
                sql.query("INSERT INTO camera  SET ?", cameraData, function (err, result) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                        resJson = failJson(resJson, err)
                        result1(null, resJson);
                        return;
                    }
                    const cameraId = result.insertId;
                    /* Get New Created Camera using Camera Id*/
                    sql.query(` SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image, c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename,  cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id    left join trackingmethod tm on c.trackingmethod=tm.id   where c.id
                                    = ${cameraId}`, function (err, res) {
                        if (err) {
                            console.log("eror " + JSON.stringify(err));
                            sql.rollback(function () {
                                throw err;
                            });
                        }
                        if (res.length) {
                            var msg = "Camera Created Successfully"
                            resJson = sucessJson(res, resJson, msg)

                        } else {
                            var errormsg = 'Camera Not Found for Id';
                            resJson = failJson(resJson, errormsg)

                        }

                        sql.commit(function (err) {
                            if (err) {
                                sql.rollback(function () {
                                    throw err;
                                });
                            }
                            result1(null, resJson);
                            return;

                        });
                    });
                });

            } else {
                var errormsg = "Camera Status Inactive Not Found in System"
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
}



// Find a single Camera with a CameraId
Camera.findById = (cameraId, result) => {
    sql.query(`SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image, c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename,  cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id    left join trackingmethod tm on c.trackingmethod=tm.id   
      where c.id = ${cameraId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let resJson = {};
        if (res.length) {
            var msg = 'Camera Details Featched Successfully';
            resJson = sucessJson(res, resJson, msg)
            result(null, resJson);
            return;
        } else {
            var errormsg = 'Camera Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all Device from the database.
Camera.getAll = result => {
    sql.query("   SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image,c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c  left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id   left join trackingmethod tm on c.trackingmethod=tm.id  ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let resJson = {};
        var msg = "CameraList Featched Successfully";
        resJson = sucessJsonList(res, resJson, msg);
        result(null, resJson);
        return;

    }

    );
};

/* Update Camera Details */
Camera.update = (newCamera, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateValidate(newCamera, resJson);
    if (resJson) {
        result1(null, resJson);
        return;
    }
    /*Check Device is in System  */
    Device.isDeviceExits(newCamera.device.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Device Not Found ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;


            } else {
                isValidSpaceDetails(newCamera, resJson, result1);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};

function isValidSpaceDetails(newCamera, resJson, result1) {
    if (null != newCamera.space && '' != newCamera.space && !newCamera.space) {
        /*Check Space is in System  */
        Space.isSpaceExits(newCamera.space.id)
            .then((answer) => {
                if (!answer) {
                    var errormsg = 'Space Not Found ';
                    resJson = failJson(resJson, errormsg)
                    result1(null, resJson);
                    return;


                } else {
                    /*Update Camera Details  */
                    updateCameraDetails(newCamera, resJson, result1);
                }
            })
            // similar to "catch"
            .catch((error) => {
                console.log("error", error);
            });
    } else {
        /*Update Camera Details  */
        updateCameraDetails(newCamera, resJson, result1);
    }


}

function isValidSpaceDetailsCreate(newCamera, resJson, result1) {
    if (null != newCamera.space && '' != newCamera.space && !newCamera.space) {
        /*Check Space is in System  */
        Space.isSpaceExits(newCamera.space.id)
            .then((answer) => {
                if (!answer) {
                    var errormsg = 'Space Not Found ';
                    resJson = failJson(resJson, errormsg)
                    result1(null, resJson);
                    return;


                } else {
                    /*Update Camera Details  */
                    createCameraDetails(newCamera, resJson, result1);
                }
            })
            // similar to "catch"
            .catch((error) => {
                console.log("error", error);
            });
    } else {
        console.log("camera has no space")
        /*Update Camera Details  */
        createCameraDetails(newCamera, resJson, result1);
    }


}


function updateCameraDetails(newCamera, resJson, result1) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /* Get CameraData Object and Update Camera */
        let cameraData = {};
        var camerastatus = null;
        cameraData = getCameraData(newCamera, cameraData, camerastatus);
        sql.query("UPDATE camera SET trackingmethod = ?,framewidth = ?,hlsstreamurl = ?,name = ?, manufacturer = ?, specification = ?, streamurl = ?, space = ?, image = ?, device = ? WHERE id = ?",
            [cameraData.trackingmethod, cameraData.framewidth, cameraData.hlsstreamurl, cameraData.name, cameraData.manufacturer, cameraData.specification, cameraData.streamurl, cameraData.space, cameraData.image, cameraData.device, cameraData.id], function (err, result) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                    result1(null, err);
                    return;
                }


                Camera.getCamera(newCamera.id)
                    .then((answer) => {
                        if (!answer) {
                            var errormsg = 'Camera Not Found ';
                            resJson = failJson(resJson, errormsg)
                            result1(null, resJson);
                            return;


                        } else {
                            var msg = "Camera Update Sucessfully"
                            resJson = sucessJson1(answer[0], resJson, msg)
                            sql.commit(function (err) {
                                if (err) {
                                    sql.rollback(function () {
                                        throw err;
                                    });
                                }
                                result1(null, resJson);
                                return;

                            });

                        }
                    })

            });

    });
}



Camera.getAvailableCamera = result => {
    sql.query(`  SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image,c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c  left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id   left join trackingmethod tm on c.trackingmethod=tm.id 
    where c.space is null  `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let resJson = {};
        var msg = "Available CameraList Featched Successfully";
        resJson = sucessJsonList(res, resJson, msg);
        result(null, resJson);
        return;

    }

    );
};





/* Camera Create Validator */
function createValidate(newCamera, resJson) {
    if (null == newCamera) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCamera.name) {
        var errormsg = 'Camera Name Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCamera.device) {
        var errormsg = 'Device Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newCamera.device.id) {
        var errormsg = 'Device Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
}
/* Space Update Validator */
function updateValidate(newCamera, resJson) {
    if (null == newCamera) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (null == newCamera.id || newCamera.id == '') {
        var errormsg = 'Camera Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }




}

/* Get DeviceData Object */
function getCameraData(newCamera, cameraData, camerastatus) {
    var space = null
    if (null != newCamera.space) {
        space = newCamera.space.id;
    }
    var trackingmethod = null
    if (null != newCamera.trackingMethod) {
        trackingmethod = newCamera.trackingMethod.id;
    }
    cameraData = {
        id: newCamera.id,
        name: newCamera.name,
        manufacturer: newCamera.manufacturer,
        specification: newCamera.specification,
        streamurl: newCamera.streamurl,
        trackingmethod: trackingmethod,
        framewidth: newCamera.framewidth,
        hlsstreamurl: newCamera.hlsstreamurl,
        space: space,
        image: newCamera.image,
        device: newCamera.device.id,
        /* Set Camera status Inactive Default when Camera created */
        status: camerastatus

    }

    return cameraData;
}

/* Create Json for Suceess Device */
function sucessJson(res, resJson, msg) {
    let space = null;
    if (null != res[0].spaceid) {
        space = {
            id: res[0].spaceid,
            name: res[0].spacename
        }
    }

    let trackingMethod = null;
    if (null != res[0].trackingmethodid) {
        trackingMethod = {
            id: res[0].trackingmethodid,
            name: res[0].trackingmethodname,
            description: res[0].trackingmethoddescription
        }
    }

    let device = null;
    if (null != res[0].deviceid) {
        device = {
            id: res[0].deviceid,
            name: res[0].devicename
        }
    }
    let cameraStatus = null;
    if (null != res[0].camerastatusid) {
        cameraStatus = {
            id: res[0].camerastatusid,
            status: res[0].camerastatus,
            description: res[0].camerastatusdescription
        }
    }
    let camera = {};
    camera = {
        id: res[0].id,
        name: res[0].name,
        manufacturer: res[0].manufacturer,
        specification: res[0].specification,
        streamurl: res[0].streamurl,
        framewidth: res[0].framewidth,
        hlsstreamurl: res[0].hlsstreamurl,
        image: res[0].image,
        space: space,
        device: device,
        cameraStatus: cameraStatus,
        trackingMethod: trackingMethod
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

/* Create Json for Suceess Device */
function sucessJson1(res, resJson, msg) {
    let space = null;
    if (null != res.spaceid) {
        space = {
            id: res.spaceid,
            name: res.spacename
        }
    }

    let trackingMethod = null;
    if (null != res.trackingmethodid) {
        trackingMethod = {
            id: res.trackingmethodid,
            name: res.trackingmethodname,
            description: res.trackingmethoddescription
        }
    }

    let device = null;
    if (null != res.deviceid) {
        device = {
            id: res.deviceid,
            name: res.devicename
        }
    }
    let cameraStatus = null;
    if (null != res.camerastatusid) {
        cameraStatus = {
            id: res.camerastatusid,
            status: res.camerastatus,
            description: res.camerastatusdescription
        }
    }
    let camera = {};
    camera = {
        id: res.id,
        name: res.name,
        manufacturer: res.manufacturer,
        specification: res.specification,
        streamurl: res.streamurl,
        framewidth: res.framewidth,
        hlsstreamurl: res.hlsstreamurl,
        image: res.image,
        space: space,
        device: device,
        cameraStatus: cameraStatus,
        trackingMethod:trackingMethod
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
    resJson = {
        "status": "FAIL",
        "data": null,
        "msg": null,
        "errormsg": errormsg

    }
    return resJson;
};

/* Create Json for Suceess Camera List */
function sucessJsonList(res, resJson, msg) {
    let camera = {};
    let cameraList = [];

    for (let i = 0; i < res.length; i++) {
        let space = null;
        if (null != res[i].spaceid) {
            space = {
                id: res[i].spaceid,
                name: res[i].spacename
            }
        }
        let trackingMethod = null;
        if (null != res[i].trackingmethodid) {
            trackingMethod = {
                id: res[i].trackingmethodid,
                name: res[i].trackingmethodname,
                description: res[i].trackingmethoddescription
            }
        }
        let device = null;
        if (null != res[i].deviceid) {
            device = {
                id: res[i].deviceid,
                name: res[i].devicename
            }
        }
        let cameraStatus = null;
        if (null != res[i].camerastatusid) {
            cameraStatus = {
                id: res[i].camerastatusid,
                status: res[i].camerastatus,
                description: res[i].camerastatusdescription
            }
        }
        camera = {
            id: res[i].id,
            name: res[i].name,
            manufacturer: res[i].manufacturer,
            specification: res[i].specification,
            streamurl: res[i].streamurl,
            framewidth: res[i].framewidth,
            hlsstreamurl: res[i].hlsstreamurl,
            image: res[i].image,
            space: space,
            device: device,
            cameraStatus: cameraStatus,
            trackingMethod: trackingMethod

        }
        cameraList.push(camera)
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

/* Create Json for delete Camera */
function deleteSuccessJson(resJson) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": null,
        "msg": "Camera Deleted Successfully",
        "errormsg": "",

    }
    return resJson;
};

Camera.getCamera = (cameraId) => {
    return new Promise((resolve, reject) => {
        sql.query(` SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image,c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c  left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id   left join trackingmethod tm on c.trackingmethod=tm.id 
         where c.id = ${cameraId}`, function (err, res) {
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

Camera.assignCameraList = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(` SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image,c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c  left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id   left join trackingmethod tm on c.trackingmethod=tm.id 
        where c.space = ${spaceId}`, function (err, res) {
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
Camera.availableCameraList = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image,c.framewidth,c.hlsstreamurl, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename, tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM camera c  left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id  left join device d on c.device=d.id   left join trackingmethod tm on c.trackingmethod=tm.id 
        where c.space is null`, function (err, res) {
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

Camera.assignCamera = (newCamera, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = assignCameraValidate(newCamera, resJson);
    if (resJson) {
        result1(null, resJson);
        return;
    }
    /*Check Device is in System  */
    Camera.getCamera(newCamera.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Camera Not Found in System ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;


            } else {
                isValidSpaceDetailsforAssignCamera(newCamera, resJson, result1);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};

/* Space Update Validator */
function assignCameraValidate(newCamera, resJson) {
    if (null == newCamera) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (null == newCamera.id || newCamera.id == '') {
        var errormsg = 'Camera Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCamera.space) {
        var errormsg = 'Space Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newCamera.space.id) {
        var errormsg = 'Space Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
}

function isValidSpaceDetailsforAssignCamera(newCamera, resJson, result1) {
    if (newCamera.space) {
        /*Check Space is in System  */
        Camera.checkSpaceValidData(newCamera.space.id)
            .then((answer) => {
                if (answer) {
                    var errormsg = 'Space Not Found in System ';
                    resJson = failJson(resJson, errormsg)
                    result1(null, resJson);
                    return;


                } else {
                    /*Update Camera Details  */
                    assignCamera(newCamera, resJson, result1);
                }
            })
            // similar to "catch"
            .catch((error) => {
                console.log("error", error);
            });
    }


}
function assignCamera(newCamera, resJson, result1) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /* Get CameraData Object and Update Camera */

        sql.query("UPDATE camera SET space = ? WHERE id = ?", [newCamera.space.id, newCamera.id], function (err, result) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
                result1(null, err);
                return;
            }


            Camera.getCamera(newCamera.id)
                .then((answer) => {
                    if (!answer) {
                        var errormsg = 'Camera Not Found ';
                        resJson = failJson(resJson, errormsg)
                        result1(null, resJson);
                        return;


                    } else {
                        getAssignandAvailableCameraList(newCamera, resJson, result1);
                    }
                })
                // similar to "catch"
                .catch((error) => {
                    console.log("error", error);
                });

        });

    });
}

function getAssignandAvailableCameraList(newCamera, resJson, result1) {

    let assignCameraList = [];
    let availableCameraList = [];
    let camera = {};
    /*Get Assign CameraList for SpaceId */
    Camera.assignCameraList(newCamera.space.id)
        .then((answer) => {
            if (answer) {
                for (let i = 0; i < answer.length; i++) {
                    camera = {
                        id: answer[i].id,
                        name: answer[i].name,
                        streamurl: answer[i].streamurl
                    }
                    assignCameraList.push(camera)
                }
            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
    /*Get Avialable CameraList */
    Camera.availableCameraList()
        .then((answer) => {
            if (answer) {
                for (let i = 0; i < answer.length; i++) {
                    camera = {
                        id: answer[i].id,
                        name: answer[i].name,
                        streamurl: answer[i].streamurl
                    }
                    availableCameraList.push(camera)

                }
                var msg = "CameraList Featched Successfully"
                resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, resJson, msg);
                sql.commit(function (err) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }

                    result1(null, resJson);
                    return;

                });
            } else {
                var msg = "CameraList Featched Successfully"
                resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, resJson, msg);
                sql.commit(function (err) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }

                    result1(null, resJson);
                    return;

                });
            }

        })

        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });


}

/* Create Json for Suceess Space List */
function sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, resJson, msg) {
    let camera = {};
    camera = {
        assignCameraList: assignCameraList,
        availableCameraList: availableCameraList
    }

    resJson = {
        "status": "SUCCESS",
        "data": camera,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};


Camera.checkSpaceValidData = (spaceId) => {
    return new Promise((resolve, reject) => {
        if (null != spaceId) {
            Camera.isSpaceExits(spaceId)
                .then((answer) => {
                    if (!answer) {
                        resolve('Space Details Not Found in System');
                    } else {
                        resolve('');
                    }
                })

        } else {
            resolve('');
        }

    });

};

Camera.isSpaceExits = (spaceId) => {
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

Camera.delete = (cameraId, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    /*Check Device is in System  */
    Camera.getCamera(cameraId)
        .then((answer) => {
            console.log("answer", answer);
            if (!answer) {
                var errormsg = 'Camera Not Found ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;


            } else {
                sql.query("DELETE FROM camera WHERE id = ?", cameraId, function (err, res3) {
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
                    console.log('Transaction Completed Successfully.');
                    result1(null, resJson);
                    return;

                });
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};



// Camera.delete = (cameraId, result1) => {
//     let resJson = {};
//     /*Check Camera is in System  */
//     Camera.getCamera(cameraId)
//         .then((answer) => {
//             if (!answer) {
//                 var errormsg = 'Camera Not Found ';
//                 resJson = failJson(resJson, errormsg)
//                 result1(null, resJson);
//                 return;
//             } else {

//                 CameraRegion.findByCamera(cameraId)
//                     .then((answer) => {
//                         if (answer) {
//                             var errormsg = 'Can Not Delete Camera which have Camera Region';
//                             resJson = failJson(resJson, errormsg)
//                             result1(null, resJson);
//                             return;
//                         } else {
//                             deleteCamera(cameraId, resJson, result1);
//                         }

//                     })

//             }
//         })
// };

// function deleteCamera(cameraId, resJson, result1) {
//     sql.query("DELETE FROM camera WHERE id = ?", cameraId, function (err, res3) {
//         if (err) {
//             sql.rollback(function () {
//                 throw err;
//             });
//         }
//     });

//     /* Construct Success Json */
//     resJson = deleteSuccessJson(resJson)
//     sql.commit(function (err) {
//         if (err) {
//             sql.rollback(function () {
//                 throw err;
//             });
//         }
//         result1(null, resJson);
//         return;

//     });
// }

Camera.removeCamera = (newCamera, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = assignCameraValidate(newCamera, resJson);
    if (resJson) {
        result1(null, resJson);
        return;
    }
    /*Check Device is in System  */
    Camera.getCamera(newCamera.id)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Camera Not Found in System ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;


            } else {
                isValidSpaceDetailsforRemoveCamera(newCamera, resJson, result1);
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};

function isValidSpaceDetailsforRemoveCamera(newCamera, resJson, result1) {
    if (newCamera.space) {
        /*Check Space is in System  */
        Camera.checkSpaceValidData(newCamera.space.id)
            .then((answer) => {
                if (answer) {
                    var errormsg = 'Space Not Found in System ';
                    resJson = failJson(resJson, errormsg)
                    result1(null, resJson);
                    return;


                } else {
                    /*Update Camera Details  */
                    removeCamera(newCamera, resJson, result1);
                }
            })
            // similar to "catch"
            .catch((error) => {
                console.log("error", error);
            });
    }


}

function removeCamera(newCamera, resJson, result1) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /* Get CameraData Object and Update Camera */

        sql.query("UPDATE camera SET space = ? WHERE id = ?", [null, newCamera.id], function (err, result) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
                result1(null, err);
                return;
            }


            Camera.getCamera(newCamera.id)
                .then((answer) => {
                    if (!answer) {
                        var errormsg = 'Camera Not Found ';
                        resJson = failJson(resJson, errormsg)
                        result1(null, resJson);
                        return;


                    } else {
                        getAssignandAvailableCameraList(newCamera, resJson, result1);
                    }
                })
                // similar to "catch"
                .catch((error) => {
                    console.log("error", error);
                });

        });

    });
}
/* Get Camera Details By Space*/
Camera.findBySpace = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename FROM camera c left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id left join device d on c.device=d.id 
        where c.space = ${spaceId}`, (err, res) => {
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


/* Update Camera Details */
Camera.updateCameraStatus = (newCamera, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateCameraStatusValidate(newCamera, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /**Check Camera is in System */
            Camera.getCamera(newCamera.id)
                .then((answer) => {
                    /*Return Error msg if any */
                    if (!answer) {
                        var errormsg = 'Camera Not Found in System ';
                        resJson = failJson(resJson, errormsg)
                        result(null, resJson);
                        return;
                    } else {

                        /**Check Camera Status is in System */
                        CameraStatus.getById(newCamera.cameraStatus.id)
                            .then((answer) => {
                                /*Return Error msg if any */
                                if (!answer) {
                                    var errormsg = 'Camera Status Not Found in System ';
                                    resJson = failJson(resJson, errormsg)
                                    result(null, resJson);
                                    return;
                                } else {
                                    updateCameraStatusData(newCamera, resJson, result);

                                }
                            })

                    }
                })

        });

    } else {
        result(null, resJson);
        return;
    }

};

/* Updated Camera Status */
function updateCameraStatusData(newCamera, resJson, result) {

    var updatedon = new Date();
    sql.query("UPDATE camera  SET updatedon = ?, status = ? WHERE id = ?",
        [updatedon, newCamera.cameraStatus.id, newCamera.id], function (err, res) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
            }
            /* Get Updated Camera */
            sql.query(` SELECT c.id,c.name,c.manufacturer,c.specification,c.streamurl,c.image, sp.id as spaceid,sp.name as spacename, cs.id as camerastatusid,cs.status as camerastatus,cs.description as camerastatusdescription, d.id as deviceid,d.name as devicename FROM camera c left join space sp on c.space=sp.id  left join camerastatus cs on c.status=cs.id left join device d on c.device=d.id 
            where c.id  = ${newCamera.id}`, function (err, res) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
                if (res.length) {
                    var msg = "Camera Update Successfully"
                    resJson = sucessJson(res, resJson, msg)

                } else {
                    var errormsg = 'Camera Not Found for ID';
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

        });

}

/* Update CameraStatus Validator */
function updateCameraStatusValidate(newCamera, resJson) {
    if (null == newCamera) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCamera.id) {
        var errormsg = 'Camera Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newCamera.cameraStatus) {
        var errormsg = 'Camera Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newCamera.cameraStatus.id) {
        var errormsg = 'Camera Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}





module.exports = Camera;