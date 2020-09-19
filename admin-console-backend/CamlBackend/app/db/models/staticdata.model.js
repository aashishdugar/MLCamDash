const sql = require("../db.js");
const { json } = require("body-parser");
const DataObject = require("./dataobject.model.js");

// constructor
const StaticData = function () {

};


// Retrieve all Static Data from the database.
StaticData.getStatic = result => {
    let configObjectList = []
    sql.query(` SELECT co.id,co.name,co.description, coa.id as configobjectattributeid,coa.name as configobjectattributename,coa.description as configobjectattributedescription, dt.id as datatypesid,dt.name as datatypesname  FROM configobject co left join configobjectattribute coa on co.id=coa.configobject  left join datatypes dt on coa.datatype = dt.id`,

        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            configObjectList = sucessJsonList1(res, configObjectList)



            let countrystateList = [];
            /* Get All EventType from the database. */
            sql.query(" SELECT et.id,et.type from eventtype et ", (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                let event = {};
                let eventTypeList = [];
                for (let i = 0; i < res.length; i++) {
                    eventType = {
                        id: res[i].id,
                        type: res[i].type
                    }
                    eventTypeList.push(eventType)
                }
                /* Get All EventStatus from the database. */
                sql.query(" SELECT es.id,es.status from eventstatus es ", (err1, res1) => {
                    if (err1) {
                        console.log("error: ", err1);
                        result(null, err1);
                        return;
                    }
                    let eventStatusList = [];
                    for (let j = 0; j < res1.length; j++) {
                        eventstatus = {
                            id: res1[j].id,
                            status: res1[j].status
                        }
                        eventStatusList.push(eventstatus)
                    }
                    /* Get All CameraStatus from the database. */
                    sql.query(" SELECT cs.id,cs.status from camerastatus cs ", (err2, res2) => {
                        if (err2) {
                            console.log("error: ", err2);
                            result(null, err2);
                            return;
                        }
                        let cameraStatusList = [];
                        for (let k = 0; k < res2.length; k++) {
                            camerastatus = {
                                id: res2[k].id,
                                status: res2[k].status
                            }
                            cameraStatusList.push(camerastatus)
                        }
                        /* Get All SpaceType from the database. */
                        sql.query(" SELECT st.id,st.type from spacetype st ", (err3, res3) => {
                            if (err3) {
                                console.log("error: ", err3);
                                result(null, err3);
                                return;
                            }
                            let spaceTypeList = [];
                            for (let l = 0; l < res3.length; l++) {
                                spacetype = {
                                    id: res3[l].id,
                                    type: res3[l].type
                                }
                                spaceTypeList.push(spacetype)
                            }
                            /* Get All DeviceType from the database. */
                            sql.query(" SELECT dt.id,dt.type from devicetype dt ", (err4, res4) => {
                                if (err4) {
                                    console.log("error: ", err4);
                                    result(null, err4);
                                    return;
                                }
                                let deviceTypeList = [];
                                for (let m = 0; m < res4.length; m++) {
                                    devicetype = {
                                        id: res4[m].id,
                                        type: res4[m].type
                                    }
                                    deviceTypeList.push(devicetype)
                                }
                                /* Get All DeviceStatus from the database. */
                                sql.query(" SELECT ds.id,ds.status from devicestatus ds ", (err5, res5) => {
                                    if (err5) {
                                        console.log("error: ", err5);
                                        result(null, err5);
                                        return;
                                    }
                                    let deviceStatusList = [];
                                    for (let n = 0; n < res5.length; n++) {
                                        devicestatus = {
                                            id: res5[n].id,
                                            status: res5[n].status
                                        }
                                        deviceStatusList.push(devicestatus)
                                    }

                                    /* Get All DeviceStatus from the database. */
                                    sql.query(" SELECT op.id,op.name,op.label from operations op ", (err6, res6) => {
                                        if (err6) {
                                            console.log("error: ", err6);
                                            result(null, err6);
                                            return;
                                        }
                                        let operatorsList = [];
                                        for (let s = 0; s < res6.length; s++) {
                                            operators = {
                                                id: res6[s].id,
                                                name: res6[s].name,
                                                label: res6[s].label
                                            }
                                            operatorsList.push(operators)
                                        }

                                        /* Get All SpaceStatus from the database. */
                                        sql.query("SELECT ss.id,ss.status,ss.description from spacestatus ss ", (err7, res7) => {
                                            if (err7) {
                                                console.log("error: ", err7);
                                                result(null, err7);
                                                return;
                                            }
                                            let spaceStatusList = [];
                                            for (let u = 0; u < res7.length; u++) {
                                                spaceStatus = {
                                                    id: res7[u].id,
                                                    status: res7[u].status,
                                                    description: res7[u].description
                                                }
                                                spaceStatusList.push(spaceStatus)
                                            }


                                            /* Get All RuleStatus from the database. */
                                            sql.query("SELECT rs.id,rs.status,rs.description from rulestatus rs ", (err8, res8) => {
                                                if (err8) {
                                                    console.log("error: ", err8);
                                                    result(null, err8);
                                                    return;
                                                }
                                                let ruleStatusList = [];
                                                for (let v = 0; v < res8.length; v++) {
                                                    rulestatus = {
                                                        id: res8[v].id,
                                                        status: res8[v].status,
                                                        description: res8[v].description
                                                    }
                                                    ruleStatusList.push(rulestatus)
                                                }

                                                /* Get All Tracking Method from the database. */
                                                sql.query("SELECT tm.id,tm.name,tm.description from trackingmethod tm ", (err9, res9) => {
                                                    if (err9) {
                                                        console.log("error: ", err9);
                                                        result(null, err9);
                                                        return;
                                                    }
                                                    let trackingMethodList = [];
                                                    for (let w = 0; w < res9.length; w++) {
                                                        trackingMethod = {
                                                            id: res9[w].id,
                                                            name: res9[w].name,
                                                            description: res9[w].description
                                                        }
                                                        trackingMethodList.push(trackingMethod)
                                                    }

                                                    let resJson = {};
                                                    /* Get All Country With StateList from the database. */
                                                    sql.query(" SELECT s.id,s.name, c.id as country,c.name as countryName FROM state s  RIGHT JOIN country c ON s.country=c.id order by country ", (err, res) => {
                                                        if (err) {
                                                            console.log("error: ", err);
                                                            result(null, err);
                                                            return;
                                                        }
                                                        if (res.length != 0) {
                                                            for (let i = 0; i < res.length; i++) {
                                                                if (i == 0) {
                                                                    let state = {};
                                                                    let stateList = [];

                                                                    state = {
                                                                        id: res[i].id,
                                                                        name: res[i].name
                                                                    }

                                                                    stateList.push(state);
                                                                    let country = {};

                                                                    country = {
                                                                        id: res[i].country,
                                                                        countryName: res[i].countryName,
                                                                        stateList
                                                                    }
                                                                    countrystateList.push(country)

                                                                } else {

                                                                    let found = countrystateList.findIndex(function (el) { return el.countryName == res[i].countryName });
                                                                    if (found != -1) {

                                                                        state = {
                                                                            id: res[i].id,
                                                                            name: res[i].name
                                                                        }

                                                                        countrystateList[found].stateList.push(state);
                                                                    } else {
                                                                        let state = {};
                                                                        let stateList = [];

                                                                        if (null != res[i].id) {
                                                                            state = {
                                                                                id: res[i].id,
                                                                                name: res[i].name
                                                                            }
                                                                            stateList.push(state);
                                                                        }

                                                                        let country = {};

                                                                        country = {
                                                                            id: res[i].country,
                                                                            countryName: res[i].countryName,
                                                                            stateList
                                                                        }
                                                                        countrystateList.push(country)
                                                                    }


                                                                }

                                                            }

                                                        }

                                                        resJson = sucessJsonList(eventTypeList, eventStatusList, cameraStatusList, spaceTypeList, countrystateList, deviceTypeList, deviceStatusList, operatorsList, configObjectList, spaceStatusList, ruleStatusList, trackingMethodList);
                                                        result(null, resJson);
                                                        return;

                                                    });

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

};
/* Construct Json */

function sucessJsonList(eventTypeList, eventStatusList, cameraStatusList, spaceTypeList, countrystateList, deviceTypeList, deviceStatusList, operatorsList, configObjectList, spaceStatusList, ruleStatusList, trackingMethodList) {
    let data = { eventTypeList, eventStatusList, cameraStatusList, spaceTypeList, countrystateList, deviceTypeList, deviceStatusList, operatorsList, configObjectList, spaceStatusList, ruleStatusList, trackingMethodList }

    resJson = {
        "status": "SUCCESS",
        "data": data,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function getList(configObjectList) {

    DataObject.getDataObjectList()
        .then((answer) => {
            configObjectList = sucessJsonList1(answer, configObjectList)
            return configObjectList;

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

/* Create Json for Suceess Camera List */
function sucessJsonList1(res) {
    let configObject = {};
    let configObjectList = [];

    for (let i = 0; i < res.length; i++) {
        let attributeList = [];
        let attribute = {};
        let dataObjectdata = configObjectList.find(obj => obj.id == res[i].id);
        if (dataObjectdata) {
            let dataObjectDetails = configObjectList.find(obj => obj.id == res[i].id);
            if (null != res[i].configobjectattributeid) {
                let datatypes = {};
                if (null != res[i].datatypesid) {
                    datatypes = {
                        id: res[i].datatypesid,
                        name: res[i].datatypesname
                    }
                }

                attribute = {
                    id: res[i].configobjectattributeid,
                    name: res[i].configobjectattributename,
                    description: res[i].configobjectattributedescription,
                    datatypes: datatypes
                }
                dataObjectDetails.attributeList.push(attribute);
            }


        } else {

            if (null != res[i].configobjectattributeid) {
                let datatypes = {};
                if (null != res[i].datatypesid) {
                    datatypes = {
                        id: res[i].datatypesid,
                        name: res[i].datatypesname
                    }
                }

                attribute = {
                    id: res[i].configobjectattributeid,
                    name: res[i].configobjectattributename,
                    description: res[i].configobjectattributedescription,
                    datatypes: datatypes
                }
                attributeList.push(attribute);
            }


            configObject = {
                id: res[i].id,
                name: res[i].name,
                description: res[i].description,
                attributeList: attributeList
            }
            configObjectList.push(configObject)

        }




    }

    return configObjectList;
};



module.exports = StaticData;
