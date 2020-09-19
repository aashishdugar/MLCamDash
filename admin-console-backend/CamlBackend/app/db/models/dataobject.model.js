const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const DataObject = function (dataObject) {
    this.id = dataObject.id;
    this.name = dataObject.name
};

/* Get DeviceData Object */
function getDataObjectData(newDataObject, dataObjectData) {
    dataObjectData = {
        id: newDataObject.id,
        name: newDataObject.name
    }
    return dataObjectData;
}


// Find a single DataObject with a DataObjectId
DataObject.findById = (dataObjectId, result1) => {
    let resJson = {};
    DataObject.getDataObject(dataObjectId)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'DataObject Not Found ';
                resJson = failJson(resJson, errormsg)
                result1(null, resJson);
                return;
            } else {
                resJson = sucessJson1(answer[0], resJson)
                result1(null, resJson);
                return;
            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

// Retrieve all DataObject from the database.
DataObject.getAll = result1 => {
    let resJson = {};
    DataObject.getDataObjectList()
        .then((answer) => {
            resJson = sucessJsonList(answer, resJson)
            result1(null, resJson);
            return;

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

// Retrieve all DataObject from the database.
function getList() {
    let resJson = {};
    DataObject.getDataObjectList()
        .then((answer) => {
            resJson = sucessJsonList1(answer, resJson)
            return resJson;

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

DataObject.getDataObject = (dataObjectId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT db.id,db.name FROM dataobject db
         where db.id = ${dataObjectId}`, function (err, res) {
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

DataObject.getDataObjectList = () => {
    return new Promise((resolve, reject) => {
        sql.query(` SELECT co.id,co.name,co.description,coa.id as configobjectattributeid,coa.name as configobjectattributename,dt.id as datatypesid,dt.name as datatypesname FROM configobject co left join configobjectattribute coa on co.id=coa.configobject  left join datatypes dt on coa.datatype = dt.id`, function (err, res) {
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

DataObject.isDataObjectNameExits = (newDataObject) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT db.id FROM dataobject db  where db.name =?`, [newDataObject.name], (err, res) => {
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

/* DataObject Create Validator */
function createValidate(newDataObject, resJson) {
    if (null == newDataObject) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newDataObject.name) {
        var errormsg = 'DataObject Name Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
}
/* DataObject Update Validator */
function updateValidate(newDataObject, resJson) {
    if (null == newDataObject) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (null == newDataObject.id || newDataObject.id == '') {
        var errormsg = 'DataObject Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }




}

/* Create Json for Suceess Device */
function sucessJson1(res, resJson) {
    let dataObject = {};
    dataObject = {
        id: res.id,
        name: res.name
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": dataObject,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};
/* Create Json for Suceess Camera List */
function sucessJsonList(res, resJson) {
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
    resJson = {
        "status": "SUCCESS",
        "data": configObjectList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};


/* Create Json for Fail DataObject */
function failJson(resJson, errormsg) {
    resJson = {
        "status": "FAIL",
        "data": null,
        "msg": null,
        "errormsg": errormsg

    }
    return resJson;
};

/* Create Json for Fail DataObject */
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

module.exports = DataObject;