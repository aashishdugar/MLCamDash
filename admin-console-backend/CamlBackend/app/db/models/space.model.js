const sql = require("../db.js");
const { json } = require("body-parser");
const Camera = require("./camera.model.js");
const Rule = require("./rule.model.js");
const CameraRegion = require("./cameraregion.model.js");
const SpaceStatus = require("./spacestatus.model.js");
const { updateSpaceStatus } = require("../../controllers/space.controller.js");

// constructor
const Space = function (space) {
    this.id = space.id;
    this.name = space.name
};

Space.create = (newSpace, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = createValidate(newSpace, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            var addressId = null;
            var diamensionId = null;
            /* Get AddressData Object and Insert into Address */
            let addressData = {};
            addressData = getAddressData(newSpace, addressData);
            sql.query("INSERT INTO address  SET ?", addressData, function (err, result) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
                addressId = result.insertId;
                /* Get DimensionData Object and Insert into Dimension */
                let dimensionData = {};
                dimensionData = getDimensionData(newSpace, dimensionData);
                sql.query("INSERT INTO dimension  SET ?", dimensionData, function (err, result) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    diamensionId = result.insertId;
                    /* Get SpaceData Object and Insert into Space */
                    let spaceData = {};
                    let status = null;
                    SpaceStatus.findByStatus()
                        .then((answer) => {
                            if (answer) {
                                status = answer[0].id
                            }
                            spaceData = getSpaceData(newSpace, spaceData, addressId, diamensionId, status);
                            sql.query("INSERT INTO space  SET ?", spaceData, function (err, result) {
                                if (err) {
                                    console.log("eror " + JSON.stringify(err));
                                    sql.rollback(function () {
                                        throw err;
                                    });
                                }
                                const spaceId = result.insertId;
                                /* Get New Created Space using Inserted Id*/
                                sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname, d.id as dimensionid,d.x,d.y,d.height,d.width, spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription, pst.id as parentspace,pst.name as parentname, ss.id as spacestatusid, ss.status as status, ss.description as spacestatusdescription  FROM space sp left join address a on sp.address=a.id left join state s on a.state=s.id   left join country c on c.id = s.country left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id  left join space pst on sp.parentspace = pst.id     left join spacestatus ss on sp.status = ss.id     
                                     where sp.id = ${spaceId}`, function (err, res) {
                                    if (err) {
                                        console.log("eror " + JSON.stringify(err));
                                        sql.rollback(function () {
                                            throw err;
                                        });
                                    }
                                    if (res.length) {
                                        var msg = "Space Created Successfully"
                                        resJson = sucessJson(res, resJson, msg)

                                    } else {
                                        var errormsg = 'Space Not Found for Id';
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

            });


        });
    } else {
        result1(null, resJson);
        return;
    }


};


// Find a single Space with a SpaceId
Space.findById = (spaceId, result) => {
    sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname, d.id as dimensionid,d.x,d.y,d.height,d.width, spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription, pst.id as parentspace,pst.name as parentname, ss.id as spacestatusid, ss.status as status, ss.description as spacestatusdescription  FROM space sp left join address a on sp.address=a.id left join state s on a.state=s.id   left join country c on c.id = s.country left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id  left join space pst on sp.parentspace = pst.id     left join spacestatus ss on sp.status = ss.id  
    where sp.id = ${spaceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let resJson = {};
        if (res.length) {
            var msg = "Space Featched Successfully"
            resJson = sucessJson(res, resJson, msg)
            result(null, resJson);
            return;
        } else {
            var errormsg = 'Space Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};
// Delete a single Space with a SpaceId
Space.delete = (spaceId, result) => {
    let resJson = {};
    /**Check space is in System */
    Space.getSpace(spaceId)
        .then((answer) => {
            /*Return Error msg if any */
            if (!answer) {
                var errormsg = 'Space Not Found in System ';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;
            } else {
                /**Check space is parent */
                Space.isParentSpace(spaceId)
                    .then((answer1) => {
                        /*Return Error msg if any */
                        if (answer1) {
                            var errormsg = 'Can Not Delete Space Which is Parent Space to Another Space ';
                            resJson = failJson(resJson, errormsg)
                            result(null, resJson);
                            return;
                        } else {
                            /**Check space used in Camera */
                            Camera.findBySpace(spaceId)
                                .then((answer1) => {
                                    /*Return Error msg if any */
                                    if (answer1) {
                                        var errormsg = 'Can Not Delete Space Which is Assign to Camera ';
                                        resJson = failJson(resJson, errormsg)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        /**Check space used in Rule */
                                        Rule.getBySpace(spaceId)
                                            .then((answer1) => {
                                                /*Return Error msg if any */
                                                if (answer1) {
                                                    var errormsg = 'Can Not Delete Space Which is Assign to Rule ';
                                                    resJson = failJson(resJson, errormsg)
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    /**Delete Space Data */
                                                    deleteSpaceData(answer, resJson, result)

                                                }
                                            })

                                    }
                                })

                        }
                    })

            }
        })

};


// Retrieve all Space from the database.
Space.getAll = result => {
    sql.query(" SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname, d.id as dimensionid,d.x,d.y,d.height,d.width, spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription, pst.id as parentspace,pst.name as parentname, ss.id as spacestatusid, ss.status as status, ss.description as spacestatusdescription  FROM space sp left join address a on sp.address=a.id left join state s on a.state=s.id   left join country c on c.id = s.country left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id  left join space pst on sp.parentspace = pst.id     left join spacestatus ss on sp.status = ss.id ", (err, res) => {
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
/* Update Space Details */
Space.update = (newSpace, result1) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateValidate(newSpace, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /* Get AddressData Object and Update Address */
            let addressData = {};
            addressData = getAddressData(newSpace, addressData);
            sql.query("UPDATE address SET line = ?, city = ?, zipcode = ?, state = ? WHERE id = ?", [addressData.line, addressData.city, addressData.zipcode, addressData.state, addressData.id], function (err, result) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
                /* Get DimensionData Object and Update Dimension */
                let dimensionData = {};
                dimensionData = getDimensionData(newSpace, dimensionData);
                sql.query("UPDATE dimension  SET x = ?, y = ?, height = ?, width = ? WHERE id = ?", [dimensionData.x, dimensionData.y, dimensionData.height, dimensionData.width, dimensionData.id], function (err, result) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    /* Get SpaceData Object and Update Space */
                    let spaceData = {};
                    var status = null;
                    if (newSpace.SpaceStatus != null && newSpace.SpaceStatus.id != null) {
                        status = newSpace.SpaceStatus.id
                    }
                    var updatedon = new Date();
                    spaceData = getSpaceData(newSpace, spaceData, newSpace.address.id, newSpace.dimension.id, status);
                    sql.query("UPDATE space  SET name = ?, updatedon = ?, icon = ?, layout = ?, address = ?, parentspace = ?, dimension = ?, spacetype = ?,status = ? WHERE id = ?",
                        [spaceData.name, updatedon, spaceData.icon, spaceData.layout, spaceData.address, spaceData.parentspace, spaceData.dimension, newSpace.spaceType.id, newSpace.spaceStatus.id, spaceData.id], function (err, result) {
                            if (err) {
                                console.log("eror " + JSON.stringify(err));
                                sql.rollback(function () {
                                    throw err;
                                });
                            }
                            /* Get Updated Space */
                            sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname, d.id as dimensionid,d.x,d.y,d.height,d.width, spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription, pst.id as parentspace,pst.name as parentname, ss.id as spacestatusid, ss.status as status, ss.description as spacestatusdescription  FROM space sp left join address a on sp.address=a.id left join state s on a.state=s.id   left join country c on c.id = s.country left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id  left join space pst on sp.parentspace = pst.id     left join spacestatus ss on sp.status = ss.id     
                                   where sp.id = ${newSpace.id}`, function (err, res) {
                                if (err) {
                                    console.log("eror " + JSON.stringify(err));
                                    sql.rollback(function () {
                                        throw err;
                                    });
                                }
                                if (res.length) {
                                    var msg = "Space Updated Successfully"
                                    resJson = sucessJson(res, resJson, msg)

                                } else {
                                    var errormsg = 'Space Not Found for Id';
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
        });
    } else {
        result1(null, resJson);
        return;
    }
};

// Get Top Space from the database.
Space.getTopSpace = result => {
    sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname,d.id as dimensionid,d.x,d.y,d.height,d.width,spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription,pst.id as parentspace,pst.name as parentname FROM space sp left join address a on sp.address=a.id left join  state s on a.state=s.id  left join country c on c.id = s.country  left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id left join space pst on sp.parentspace = pst.id    where sp.parentspace is null`,
        (err, res) => {
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


/**Get Assign CameraList for SpaceId and Availble CameraList */
Space.findSpaceDetails = (spaceId, result) => {
    let resJson = {};
    Space.isSpaceExits(spaceId)
        .then((answer) => {
            /*Return Error msg if any */
            if (!answer) {
                var msg = "Space Not Found in System"
                resJson = failJson(resJson, msg)
                result(null, resJson);
                return;
            } else {
                let assignCameraList = [];
                let availableCameraList = [];
                let camera = {};
                let ruleList = [];


                /*Get Rule for SpaceId */
                Rule.findBySpace(spaceId)
                    .then((answer) => {
                        if (answer) {
                            ruleList = answer;

                            Camera.assignCameraList(spaceId)
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
                                        resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, ruleList, resJson, msg);
                                        result(null, resJson);
                                        return;
                                    } else {
                                        var msg = "CameraList Featched Successfully"
                                        resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, ruleList, resJson, msg);
                                        result(null, resJson);
                                        return;

                                    }

                                })

                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });

                        } else {

                            /*Get Assign CameraList for SpaceId */
                            Camera.assignCameraList(spaceId)
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
                                        resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, ruleList, resJson, msg);
                                        result(null, resJson);
                                        return;
                                    } else {
                                        var msg = "CameraList Featched Successfully"
                                        resJson = sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, ruleList, resJson, msg);
                                        result(null, resJson);
                                        return;

                                    }

                                })

                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });

                        }
                    })



            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};


/* Create Json for Suceess Space List */
function sucessJsonForAssignAvailableCameraList(assignCameraList, availableCameraList, ruleList, resJson, msg) {
    let camera = {};
    camera = {
        assignCameraList: assignCameraList,
        availableCameraList: availableCameraList,
        ruleList: ruleList
    }

    resJson = {
        "status": "SUCCESS",
        "data": camera,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};


function findChildAndAdd(child, childSpace) {


    let elements = child.path.split("-");
    let parentpath = elements.slice(0, -1);
    parentpath = parentpath.join('-');

    for (let k = 0; k < (childSpace.length - 1); k++) {
        let outputSpace = childSpace[k];

        for (let j = 0; j < outputSpace.childSpaceList.length; j++) {
            let existingChild = outputSpace.childSpaceList[j];
            if (child.id == existingChild.id) {
                return;
            }
        }
        if (outputSpace.path == parentpath) {
            space = {
                id: child.id,
                name: child.name,
                path: child.path,
                childSpaceList: []
            }
            outputSpace.childSpaceList.push(space);
            return;
        } else {
            findChildAndAdd(child, outputSpace.childSpaceList, parentpath)
        }
    }

}

function findAndAdd(child, outputarry) {
    let elements = child.path.split("-");
    let parentpath = elements.slice(0, -1);
    parentpath = parentpath.join('-');
    for (let j = 0; j < outputarry.length; j++) {
        let outputSpace = outputarry[j];
        if (outputSpace.path == parentpath) {
            let space = {}
            let spaceType = null;
            if (null != child.spacetypeid) {
                spaceType = {
                    id: child.spacetypeid,
                    type: child.spacetype,
                    description: child.spacetypedescription
                }
            }
            let spaceStatus = null;
            if (null != child.spacestatusid) {
                spaceStatus = {
                    id: child.spacestatusid,
                    status: child.status,
                    description: child.spacestatusdescription
                }
            }
            let parentspace = null;
            if (null != child.parentspace) {
                parentspace = {
                    id: child.parentspace,
                    name: child.parentname
                }
            }

            let dimension = null;
            if (null != child.dimensionid) {
                dimension = {
                    id: child.dimensionid,
                    x: child.x,
                    y: child.y,
                    width: child.width,
                    height: child.height
                }
            }

            let address = null;
            if (null != child.addressid) {
                let state = null;
                if (null != child.stateid) {
                    country = {
                        id: child.countryid,
                        name: child.countryname
                    }
                    state = {
                        id: child.stateid,
                        name: child.statename,
                        country: country
                    }
                }
                address = {
                    id: child.addressid,
                    line: child.line,
                    city: child.city,
                    state: state
                }
            }

            space = {
                id: child.id,
                name: child.name,
                path: child.path,
                spaceType: spaceType,
                spaceStatus: spaceStatus,
                parentspace: parentspace,
                dimension: dimension,
                address: address,
                childSpaceList: []
            }
            outputSpace.childSpaceList.push(space);
            return;
        }
    }
    for (let j = 0; j < outputarry.length; j++) {
        let outputSpace = outputarry[j];
        for (let j = 0; j < outputSpace.childSpaceList.length; j++) {
            findAndAdd(child, [outputSpace.childSpaceList[j]]);
        }
    }


}

function addChildSpace(child, outputarry) {
    var path = child.path;
    let elements = path.split("-");
    let parentpath = elements.slice(0, -1);
    if (parentpath.length == 0) {
        let space = {}
        let spaceType = null;
        if (null != child.spacetypeid) {
            spaceType = {
                id: child.spacetypeid,
                type: child.spacetype,
                description: child.spacetypedescription
            }
        }
        let spaceStatus = null;
        if (null != child.spacestatusid) {
            spaceStatus = {
                id: child.spacestatusid,
                status: child.status,
                description: child.spacestatusdescription
            }
        }
        let parentspace = null;
        if (null != child.parentspace) {
            parentspace = {
                id: child.parentspace,
                name: child.parentname
            }
        }

        let dimension = null;
        if (null != child.dimensionid) {
            dimension = {
                id: child.dimensionid,
                x: child.x,
                y: child.y,
                width: child.width,
                height: child.height
            }
        }

        let address = null;
        if (null != child.addressid) {
            let state = null;
            if (null != child.stateid) {
                country = {
                    id: child.countryid,
                    name: child.countryname
                }
                state = {
                    id: child.stateid,
                    name: child.statename,
                    country: country
                }
            }
            address = {
                id: child.addressid,
                line: child.line,
                city: child.city,
                state: state
            }
        }


        space = {
            id: child.id,
            name: child.name,
            path: child.path,
            spaceType: spaceType,
            spaceStatus: spaceStatus,
            parentspace: parentspace,
            dimension: dimension,
            address: address,
            childSpaceList: []
        }
        outputarry.push(space);
        return;
    } else {

        findAndAdd(child, outputarry);

    }
}


Space.findSpaceDetailsList = (result1) => {
    let resJson = {};
    Space.getSpaceDetailsList()
        .then((response) => {
            let spaceList = [];
            if (response) {

                for (i = 0; i < response.length; i++) {
                    addChildSpace(response[i], spaceList);
                }
                var msg = 'SpaceList Fetched Successfully';
                resJson = sucessHierachyJsonList(response, resJson, spaceList, msg)
                result1(null, resJson);
                return;

            } else {
                var msg = 'SpaceList Fetched Successfully';
                resJson = sucessHierachyJsonList(response, resJson, spaceList, msg)
                result1(null, resJson);
                return;


            }
        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });



};


/* Space Create Validator */
function createValidate(newSpace, resJson) {
    if (null == newSpace) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newSpace.name) {
        var errormsg = 'Space Name Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newSpace.spaceType.id) {
        var errormsg = 'Space Type Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }

}
/* Space Update Validator */
function updateValidate(newSpace, resJson) {
    if (null == newSpace) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newSpace.id) {
        var errormsg = 'Space Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}
/* Get AddressData Object */
function getAddressData(newSpace, addressData) {
    if (newSpace.address != null) {
        let state = null;
        if (newSpace.address.state != null) {
            state = newSpace.address.state.id
        }
        addressData = {
            id: newSpace.address.id,
            line: newSpace.address.line,
            city: newSpace.address.city,
            state: state,
            zipcode: newSpace.address.zipcode

        }
    } else {
        addressData = {
            line: null,
            city: null,
            state: null,
            zipcode: null

        }
    }
    return addressData;
}
/* Get DimensionData Object */
function getDimensionData(newSpace, dimensionData) {
    if (newSpace.dimension != null) {
        dimensionData = {
            id: newSpace.dimension.id,
            x: newSpace.dimension.x,
            y: newSpace.dimension.y,
            height: newSpace.dimension.height,
            width: newSpace.dimension.width
        }
    } else {
        dimensionData = {
            x: null,
            y: null,
            height: null,
            width: null

        }

    }

    return dimensionData;
}

/* Get SpaceData Object */
function getSpaceData(newSpace, spaceData, addressId, diamensionId, status) {
    var createdon = new Date();
    let parentspace = null;
    if (null != newSpace.parentspace) {
        parentspace = newSpace.parentspace.id;
    }
    spaceData = {
        id: newSpace.id,
        name: newSpace.name,
        icon: newSpace.icon,
        createdon: createdon,
        layout: newSpace.layout,
        address: addressId,
        dimension: diamensionId,
        parentspace: parentspace,
        spacetype: newSpace.spaceType.id,
        status: status

    }
    return spaceData;
}

/* Create Json for Suceess Space List */
function sucessJsonList(res, resJson) {
    let space = {};
    let spaceList = [];

    if (res == "") {
        spaceList = [];
    } else {

        for (let i = 0; i < res.length; i++) {
            let spaceType = null;
            if (null != res[i].spacetypeid) {
                spaceType = {
                    id: res[i].spacetypeid,
                    type: res[i].spacetype,
                    description: res[i].spacetypedescription
                }
            }
            let spaceStatus = null;
            if (null != res[i].spacestatusid) {
                spaceStatus = {
                    id: res[i].spacestatusid,
                    status: res[i].status,
                    description: res[i].spacestatusdescription
                }
            }

            let parentspace = null;
            if (null != res[i].parentspace) {
                parentspace = {
                    id: res[i].parentspace,
                    name: res[i].parentname
                }
            }

            let dimension = null;
            if (null != res[i].dimensionid) {
                dimension = {
                    id: res[i].dimensionid,
                    x: res[i].x,
                    y: res[i].y,
                    width: res[i].width,
                    height: res[i].height
                }
            }

            let address = null;
            if (null != res[i].addressid) {
                let state = null;
                if (null != res[i].stateid) {
                    country = {
                        id: res[i].countryid,
                        name: res[i].countryname
                    }
                    state = {
                        id: res[i].stateid,
                        name: res[i].statename,
                        country: country
                    }
                }
                address = {
                    id: res[i].addressid,
                    line: res[i].line,
                    city: res[i].city,
                    state: state
                }
            }

            space = {
                id: res[i].id,
                name: res[i].name,
                icon: res[i].icon,
                layout: res[i].layout,
                spaceType: spaceType,
                spaceStatus:spaceStatus,
                parentspace: parentspace,
                dimension: dimension,
                address: address
            }
            spaceList.push(space)
        }
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": spaceList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};



/* Create Json for Suceess Space List */
function sucessHierachyJsonList(res, resJson, spaceList, msg) {
    let space = {};

    resJson = {
        "status": "SUCCESS",
        "data": spaceList,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};




/* Create Json for Suceess Space */
function sucessJson(res, resJson, msg) {
    let spaceType = null;
    if (null != res[0].spacetypeid) {
        spaceType = {
            id: res[0].spacetypeid,
            type: res[0].spacetype,
            description: res[0].spacetypedescription
        }
    }
    let spaceStatus = null;
    if (null != res[0].spacestatusid) {
        spaceStatus = {
            id: res[0].spacestatusid,
            status: res[0].status,
            description: res[0].spacestatusdescription
        }
    }
    let parentspace = null;
    if (null != res[0].parentspace) {
        parentspace = {
            id: res[0].parentspace,
            name: res[0].parentname
        }
    }
    let dimension = null;
    if (null != res[0].dimensionid) {
        dimension = {
            id: res[0].dimensionid,
            x: res[0].x,
            y: res[0].y,
            width: res[0].width,
            height: res[0].height
        }
    }
    let address = null;
    if (null != res[0].addressid) {
        let state = null;
        let country = null;
        if (null != res[0].stateid) {
            country = {
                id: res[0].countryid,
                name: res[0].countryname
            }
            state = {
                id: res[0].stateid,
                name: res[0].statename,
                country: country
            }
        }
        address = {
            id: res[0].addressid,
            line: res[0].line,
            city: res[0].city,
            zipcode: res[0].zipcode,
            state: state
        }
    }
    let space = {};
    space = {
        id: res[0].id,
        name: res[0].name,
        icon: res[0].icon,
        layout: res[0].layout,
        spaceType: spaceType,
        spaceStatus:spaceStatus,
        parentspace: parentspace,
        dimension: dimension,
        address: address
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": space,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};


/* Create Json for Suceess Space */
function sucessJson1(res) {
    let spaceType = {};
    if (null != res.spaceType) {
        spaceType = {
            id: res.spaceType.id,
            type: res.spaceType.type,
            description: res.spaceType.description
        }
    }

    let parentspace = {};
    if (null != res.parentspace) {
        parentspace = {
            id: res.parentspace.id,
            name: res.parentspace.name
        }
    }
    let dimension = {};
    if (null != res.dimension) {
        dimension = {
            id: res.dimension.id,
            x: res.dimension.x,
            y: res.dimension.y,
            width: res.dimension.width,
            height: res.dimension.height
        }
    }
    let address = {};
    if (null != res.address) {
        let state = {};
        let country1 = {};
        if (null != res.address.state && '' != res.address.state) {
            country1 = {
                id: res.address.state.country.id,
                name: res.address.state.country.name
            }
            state = {
                id: res.address.state.id,
                name: res.address.state.name,
                country: country1
            }
        }
        address = {
            id: res.address.id,
            line: res.address.line,
            city: res.address.city,
            zipcode: res.address.zipcode,
            state: state
        }
    }
    let space = {};
    space = {
        id: res.id,
        name: res.name,
        spaceType: spaceType,
        parentspace: parentspace,
        dimension: dimension,
        address: address,
        childSpaceList: res.childSpaceList



    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": space,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};
/* Create Json for Fail Space */
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
/* Create Json for delete Space */
function deleteSuccessJson(resJson) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": null,
        "msg": "Space Deleted Successfully",
        "errormsg": "",

    }
    return resJson;
};

Space.isSpaceExits = (spaceId) => {
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

Space.getSpaceDetails = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT sp.id,sp.name,sp.icon,sp.layout,
        a.id as addressid,a.line,a.city,a.zipcode,
        s.id as stateid, s.name as statename,
        c.id as countryid, c.name as countryname,
        d.id as dimensionid,d.x,d.y,d.height,d.width,
        spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription,
        pst.id as parentspace,pst.name as parentname,
        s2.id as childid,s2.name as childname
        FROM space s2,space sp
         left join address a on sp.address=a.id
         left join  state s on a.state=s.id 
         left join country c on c.id = s.country
         left join dimension d on sp.dimension = d.id 
         left join spacetype spt on sp.spacetype = spt.id 
         left join space pst on sp.parentspace = pst.id 
         where sp.id = ${spaceId} and  sp.id = s2.parentspace `,
            function (err, res) {
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

Space.getSpaceDetailsList = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname,d.id as dimensionid,d.x,d.y,d.height,d.width,spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription,  sps.id as spacestatusid,sps.status as status,sps.description as spacestatusdescription, pst.id as parentspace,pst.name as parentname,getpath(sp.id) AS path  FROM space sp left join address a on sp.address=a.id  left join  state s on a.state=s.id  left join country c on c.id = s.country left join dimension d on sp.dimension = d.id  left join spacetype spt on sp.spacetype = spt.id left join spacestatus sps on sp.status = sps.id  left join space pst on sp.parentspace = pst.id order by sp.parentspace `,
            function (err, res) {
                if (err) {
                    sql.rollback(function () {
                        reject(err);
                    });
                }
                if (!res) {
                    resolve('');
                } else {
                    resolve(res);
                }
            })
    });

};
/* Delete Space Details */
function deleteSpaceData(answer, resJson, result) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        /* Delete Space of given Id */
        sql.query("DELETE FROM space WHERE id = ?", answer[0].id, function (err, res) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            }
        });
        /* if Space has Address then Delete Space Address */
        if (answer[0].addressid != null) {
            sql.query("DELETE FROM address WHERE id = ?", answer[0].addressid, function (err, res) {
                if (err) {
                    sql.rollback(function () {
                        throw err;
                    });
                }
            });
        }
        /* if Space has Dimension then Delete Space Dimension */
        if (answer[0].dimensionid != null) {
            sql.query("DELETE FROM dimension WHERE id = ?", answer[0].dimensionid, function (err, res) {
                if (err) {
                    sql.rollback(function () {
                        throw err;
                    });
                }
            });
        }
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
    });
}

/* Get Space Details Using Space ID */
Space.getSpace = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname,d.id as dimensionid,d.x,d.y,d.height,d.width,spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription,pst.id as parentspace,pst.name as parentname FROM space sp left join address a on sp.address=a.id left join  state s on a.state=s.id  left join country c on c.id = s.country  left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id left join space pst on sp.parentspace = pst.id    where sp.id = ${spaceId}`, (err, res) => {
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
/* CHECK Space is Parent Space to Another Space */
Space.isParentSpace = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname,d.id as dimensionid,d.x,d.y,d.height,d.width,spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription,pst.id as parentspace,pst.name as parentname FROM space sp left join address a on sp.address=a.id left join  state s on a.state=s.id  left join country c on c.id = s.country  left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id left join space pst on sp.parentspace = pst.id  
          where sp.parentspace = ${spaceId}`, (err, res) => {
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

/* Update Space Details */
Space.updateSpaceStatus = (newSpace, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateSpaceStatusValidate(newSpace, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /**Check space is in System */
            Space.getSpace(newSpace.id)
                .then((answer) => {
                    /*Return Error msg if any */
                    if (!answer) {
                        var errormsg = 'Space Not Found in System ';
                        resJson = failJson(resJson, errormsg)
                        result(null, resJson);
                        return;
                    } else {

                        /**Check space is in System */
                        SpaceStatus.findById(newSpace.spaceStatus.id)
                            .then((answer) => {
                                /*Return Error msg if any */
                                if (!answer) {
                                    var errormsg = 'Space Status Not Found in System ';
                                    resJson = failJson(resJson, errormsg)
                                    result(null, resJson);
                                    return;
                                } else {
                                    updateSpaceStatusData(newSpace, resJson,result);

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


function updateSpaceStatusData(newSpace, resJson,result) {

    var updatedon = new Date();
    sql.query("UPDATE space  SET updatedon = ?, status = ? WHERE id = ?",
        [updatedon,newSpace.spaceStatus.id,newSpace.id], function (err, res) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
            }
            /* Get Updated Space */
            sql.query(` SELECT sp.id,sp.name,sp.icon,sp.layout,a.id as addressid,a.line,a.city,a.zipcode,s.id as stateid, s.name as statename,c.id as countryid, c.name as countryname, d.id as dimensionid,d.x,d.y,d.height,d.width, spt.id as spacetypeid,spt.type as spacetype,spt.description as spacetypedescription, pst.id as parentspace,pst.name as parentname, ss.id as spacestatusid, ss.status as status, ss.description as spacestatusdescription  FROM space sp left join address a on sp.address=a.id left join state s on a.state=s.id   left join country c on c.id = s.country left join dimension d on sp.dimension = d.id left join spacetype spt on sp.spacetype = spt.id  left join space pst on sp.parentspace = pst.id     left join spacestatus ss on sp.status = ss.id     where sp.id
             = ${newSpace.id}`, function (err, res) {
                if (err) {
                    console.log("eror " + JSON.stringify(err));
                    sql.rollback(function () {
                        throw err;
                    });
                }
                if (res.length) {
                    var msg = "Space Update Successfully"
                    resJson = sucessJson(res, resJson, msg)

                } else {
                    var errormsg = 'Space Not Found for ID';
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

/* Update SpaceStatus Validator */
function updateSpaceStatusValidate(newSpace, resJson) {
    if (null == newSpace) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newSpace.id) {
        var errormsg = 'Space Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newSpace.spaceStatus) {
        var errormsg = 'Space Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newSpace.spaceStatus.id) {
        var errormsg = 'Space Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}



module.exports = Space;
