const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const Device = function (device) {
    this.id = device.id;
    this.name = device.name
};


Device.create = (newDevice, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = createValidate(newDevice, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /* Get Inactive DeviceStatus using status*/
            sql.query(` SELECT ds.id from devicestatus ds   
                    where ds.status = "Inactive"`, function (err, res) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
                var devicestatus = null;
                if (res.length) {
                    devicestatus = res[0].id;
                }

                /* Get DeviceData Object and Insert into Device */
                let deviceData = {};
                deviceData = getDeviceData(newDevice, deviceData, devicestatus);
                sql.query("INSERT INTO device  SET ?", deviceData, function (err, result) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    const deviceId = result.insertId;
                    /* Get New Created Device using Inserted Id*/
                    sql.query(` SELECT d.id,d.name,d.manufacturer,d.icon,d.ipaddress,d.uuid,d.image,ds.id as devicestatusid,ds.status as devicestatus,ds.description as devicestatusdescription,dt.id as devicetypeid,dt.type as devicetype,dt.description as devicetypedescription FROM device d left join devicestatus ds on d.status=ds.id  left join devicetype dt on d.type=dt.id    
                                     where d.id = ${deviceId}`, function (err, res) {
                        if (err) {
                            console.log("eror " + JSON.stringify(err));
                            sql.rollback(function () {
                                throw err;
                            });
                        }
                        if (res.length) {
                            var msg = 'Caml Server Created Successfully';
                            resJson = sucessJson(res, resJson, msg)

                        } else {
                            var errormsg = 'Caml Server Not Found for Id';
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
            });



        });

    } else {
        result1(null, resJson);
        return;
    }


};




// Find a single Device with a DeviceId
Device.findById = (deviceId, result) => {
    sql.query(`SELECT d.id,d.name,d.manufacturer,d.icon,d.ipaddress,d.uuid,d.image,ds.id as devicestatusid,ds.status as devicestatus,ds.description as devicestatusdescription,dt.id as devicetypeid,dt.type as devicetype,dt.description as devicetypedescription FROM device d left join devicestatus ds on d.status=ds.id  left join devicetype dt on d.type=dt.id     where d.id = ${deviceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let resJson = {};
        if (res.length) {
            var msg = 'Caml Server Feached Successfully';
            resJson = sucessJson(res, resJson, msg)
            result(null, resJson);
            return;
        } else {
            var errormsg = 'Caml Server Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all Device from the database.
Device.getAll = result => {
    sql.query("  SELECT d.id,d.name,d.manufacturer,d.icon,d.ipaddress,d.uuid,d.image, ds.id as devicestatusid,ds.status as devicestatus,ds.description as devicestatusdescription, dt.id as devicetypeid,dt.type as devicetype,dt.description as devicetypedescription , c.id cameraid,c.name as cameraname,c.manufacturer as cameramanufacturer,c.specification as cameraspecification,c.streamurl as camerastreamurl,  c.framewidth,c.hlsstreamurl, cs.id as camerastatusid, cs.status as camerastatus,cs.description as camerastatusdescription , tm.id as trackingmethodid, tm.name as trackingmethodname, tm.description as trackingmethoddescription FROM device d  left join devicestatus ds on d.status=ds.id left join devicetype dt on d.type=dt.id  left join camera c on c.device = d.id  left join camerastatus cs on cs.id = c.status left join trackingmethod tm on c.trackingmethod=tm.id   ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let resJson = {};
        var msg = 'Caml Server List Feached Successfully';
        resJson = sucessJsonList(res, resJson, msg);
        result(null, resJson);
        return;

    }

    );
};

// Delete a single Device with a DeviceId
Device.delete = (deviceId, result1) => {
    let resJson = {};
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /* Get Device of Given Id */
        sql.query(`SELECT d.id,d.name,d.manufacturer,d.icon,d.ipaddress,d.uuid,d.image,ds.id as devicestatusid,ds.status as devicestatus,ds.description as devicestatusdescription,dt.id as devicetypeid,dt.type as devicetype,dt.description as devicetypedescription FROM device d left join devicestatus ds on d.status=ds.id  left join devicetype dt on d.type=dt.id     where d.id = ${deviceId}`, function (err, res) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            }
            if (res.length) {
                sql.query("DELETE FROM device WHERE id = ?", res[0].id, function (err, res3) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                });

                /* Construct Success Json */
                resJson = deleteSuccessJson(resJson)



            } else {
                var errormsg = 'Caml Server Not Found ';
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
    /* End transaction */

};

/* Update Device Details */
Device.update = (newDevice, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateValidate(newDevice, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /* Get AddressData Object and Update Address */
            let deviceData = {};
            var devicestatus = newDevice.deviceStatus.id;
            deviceData = getDeviceData(newDevice, deviceData, devicestatus);
            /* Check device with UUID already in system */
            sql.query("UPDATE device SET name = ?, manufacturer = ?, icon = ?, ipaddress = ?, uuid = ?, type = ?, image = ?, status=? WHERE id = ?", [deviceData.name, deviceData.manufacturer, deviceData.icon, deviceData.ipaddress, deviceData.uuid, deviceData.type, deviceData.image, deviceData.status, deviceData.id], function (err, result) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }


                /* Get Updated Device */
                sql.query(` SELECT d.id,d.name,d.manufacturer,d.icon,d.ipaddress,d.uuid,d.image,ds.id as devicestatusid,ds.status as devicestatus,ds.description as devicestatusdescription,dt.id as devicetypeid,dt.type as devicetype,dt.description as devicetypedescription FROM device d left join devicestatus ds on d.status=ds.id  left join devicetype dt on d.type=dt.id     where d.id
                                   = ${newDevice.id}`, function (err, res) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    if (res.length) {
                        var msg = 'Caml Server Updated Successfully';
                        resJson = sucessJson(res, resJson, msg)

                    } else {
                        var errormsg = 'Caml Server Not Found for Id';
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


        });

    } else {
        result1(null, resJson);
        return;
    }
};

/* Device Create Validator */
function createValidate(newDevice, resJson) {
    if (null == newDevice) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDevice.name) {
        var errormsg = 'Caml Server Name Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDevice.ipaddress) {
        var errormsg = 'Caml Server IpAddress Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDevice.uuid) {
        var errormsg = 'Caml Server UUID Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDevice.deviceType) {
        var errormsg = 'Caml Server Type Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newDevice.deviceType.id) {
        var errormsg = 'Caml Server Type Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}
/* Space Update Validator */
function updateValidate(newDevice, resJson) {
    if (null == newDevice) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDevice.id) {
        var errormsg = 'Caml Server Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}

/* Get DeviceData Object */
function getDeviceData(newDevice, deviceData, devicestatus) {
    deviceData = {
        id: newDevice.id,
        name: newDevice.name,
        manufacturer: newDevice.manufacturer,
        icon: newDevice.icon,
        ipaddress: newDevice.ipaddress,
        uuid: newDevice.uuid,
        image: newDevice.image,
        type: newDevice.deviceType.id,
        /* Set Device status Inactive Default when device created */
        status: devicestatus

    }
    return deviceData;
}


/* Create Json for Suceess Device */
function sucessJson(res, resJson, msg) {
    let deviceType = {};
    if (null != res[0].devicetypeid) {
        deviceType = {
            id: res[0].devicetypeid,
            type: res[0].devicetype,
            description: res[0].devicetypedescription
        }
    }
    let deviceStatus = {};
    if (null != res[0].devicestatusid) {
        deviceStatus = {
            id: res[0].devicestatusid,
            status: res[0].devicestatus,
            description: res[0].devicestatusdescription
        }
    }

    let device = {};
    device = {
        id: res[0].id,
        name: res[0].name,
        manufacturer: res[0].manufacturer,
        icon: res[0].icon,
        ipaddress: res[0].ipaddress,
        uuid: res[0].uuid,
        image: res[0].image,
        deviceType: deviceType,
        deviceStatus: deviceStatus
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": device,
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

/* Create Json for Suceess Device List */
function sucessJsonList(res, resJson, msg) {
    let device = {};
    let deviceList = [];
    for (let i = 0; i < res.length; i++) {

        let devicedata = deviceList.find(obj => obj.id == res[i].id);
        if (devicedata) {
            let deviceDetails = deviceList.find(obj => obj.id == res[i].id);
            let camera = null;
            let cameraStatus = null;
            if (null != res[i].cameraid) {

                if (null != res[i].camerastatusid) {

                    cameraStatus = {
                        id: res[i].camerastatusid,
                        status: res[i].camerastatus,
                        description: res[i].camerastatusdescription
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

                camera = {
                    id: res[i].cameraid,
                    name: res[i].cameraname,
                    manufacturer: res[i].cameramanufacturer,
                    specification: res[i].cameraspecification,
                    framewidth: res[i].framewidth,
                    hlsstreamurl: res[i].hlsstreamurl,
                    streamurl: res[i].camerastreamurl,
                    cameraStatus: cameraStatus,
                    trackingMethod:trackingMethod
                }
                deviceDetails.cameraList.push(camera);
            }



        } else {
            let cameraList = [];
            let camera = null;
            let cameraStatus = null;
            if (null != res[i].cameraid) {

                if (null != res[i].camerastatusid) {

                    cameraStatus = {
                        id: res[i].camerastatusid,
                        status: res[i].camerastatus,
                        description: res[i].camerastatusdescription

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


                camera = {
                    id: res[i].cameraid,
                    name: res[i].cameraname,
                    manufacturer: res[i].cameramanufacturer,
                    specification: res[i].cameraspecification,
                    framewidth: res[i].framewidth,
                    hlsstreamurl: res[i].hlsstreamurl,
                    streamurl: res[i].camerastreamurl,
                    cameraStatus: cameraStatus,
                    trackingMethod:trackingMethod
                }
                cameraList.push(camera);
            }


            let deviceType = {};
            if (null != res[i].devicetypeid) {
                deviceType = {
                    id: res[i].devicetypeid,
                    type: res[i].devicetype,
                    description: res[i].devicetypedescription
                }
            }
            let deviceStatus = {};
            if (null != res[i].devicestatusid) {
                deviceStatus = {
                    id: res[i].devicestatusid,
                    status: res[i].devicestatus,
                    description: res[i].devicestatusdescription
                }
            }
            device = {
                id: res[i].id,
                name: res[i].name,
                manufacturer: res[i].manufacturer,
                icon: res[i].icon,
                ipaddress: res[i].ipaddress,
                uuid: res[i].uuid,
                image: res[i].image,
                deviceType: deviceType,
                deviceStatus: deviceStatus,
                cameraList: cameraList

            }
            deviceList.push(device)

        }


    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": deviceList,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};

/* Create Json for delete Device */
function deleteSuccessJson(resJson) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": null,
        "msg": "Device Deleted Successfully",
        "errormsg": "",

    }
    return resJson;
};



Device.isDeviceExits = (deviceId) => {
    return new Promise((resolve, reject) => {

        sql.query(`select d.id from device d
     where d.id = ${deviceId}`, function (err, res) {
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


module.exports = Device;