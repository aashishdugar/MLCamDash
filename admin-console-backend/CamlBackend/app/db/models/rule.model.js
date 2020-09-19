const sql = require("../db.js");
const { json } = require("body-parser");
const Action = require("./action.model.js");
const RuleConfigObject = require("./ruleconfigobject.model.js");
const DataObject = require("./dataobject.model.js");
//const Space = require("./space.model.js");
const { response } = require("express");
const ptsasync = require("async");
const RuleStatus = require("./rulestatus.model.js");
const Expression = require("./expression.model.js");
const GenricSpace = require("./genricspace.model.js");
// constructor
const Rule = function (rule) {
    this.id = rule.id;
    this.name = rule.name
};


Rule.checkSpaceValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (null != newRule.space) {
            GenricSpace.isSpaceExits(newRule.space.id)
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

Rule.checkExpressionConfigObjectValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (newRule.expressionList.length > 0) {
            let size = newRule.expressionList.length;
            ptsasync.forEachOf(newRule.expressionList, function (dataElement, i, inner_callback) {
                if (null != dataElement.configObject) {
                    sql.query(`SELECT co.id  FROM configobject co
                    where co.id = ${dataElement.configObject.id}`, function (err, res) {
                        if (err) {
                            sql.rollback(function () {
                                reject(error);
                            });
                        }
                        if (res.length <= 0) {
                            resolve("Configuration Object ID " + newRule.expressionList[i].configObject.id + " Not Found");

                        } else {
                            if (i == (size - 1)) {
                                resolve('');
                            }
                        }
                    });

                } else {
                    resolve('');
                }



            }, function (err) {
                if (err) {
                    //handle the error if the query throws an error
                    console.log('Returning 1');
                    reject(error);
                } else {
                    //whatever you wanna do after all the iterations are done
                    console.log('Returning 2');
                    resolve('');
                }
            }), function () {
                console.log('Returning 3');
            };
        } else {
            resolve('');
        }

    });

};

Rule.checkExpressionConfigObjectAttributeValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (newRule.expressionList.length > 0) {
            let size = newRule.expressionList.length;
            ptsasync.forEachOf(newRule.expressionList, function (dataElement, i, inner_callback) {
                if (null != dataElement.configObjectAttribute) {
                    sql.query(`SELECT coa.id  FROM configobjectattribute coa
                    where coa.id = ${dataElement.configObjectAttribute.id}`, function (err, res) {
                        if (err) {
                            sql.rollback(function () {
                                reject(error);
                            });
                        }
                        if (res.length <= 0) {
                            resolve("Configuration Attribute ID " + newRule.expressionList[i].configObjectAttribute.id + " Not Found");

                        } else {
                            if (i == (size - 1)) {
                                resolve('');
                            }
                        }
                    });

                } else {
                    resolve('');
                }



            }, function (err) {
                if (err) {
                    //handle the error if the query throws an error
                    console.log('Returning 1');
                    reject(error);
                } else {
                    //whatever you wanna do after all the iterations are done
                    console.log('Returning 2');
                    resolve('');
                }
            }), function () {
                console.log('Returning 3');
            };
        } else {
            resolve('');
        }

    });

};

Rule.checkExpressionOperationValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (newRule.expressionList.length > 0) {
            let size = newRule.expressionList.length;
            ptsasync.forEachOf(newRule.expressionList, function (dataElement, i, inner_callback) {
                if (null != dataElement.operations) {
                    sql.query(`SELECT op.id  FROM operations op
                    where op.id = ${dataElement.operations.id}`, function (err, res) {
                        if (err) {
                            sql.rollback(function () {
                                reject(error);
                            });
                        }
                        if (res.length <= 0) {
                            resolve("Opeation ID " + newRule.expressionList[i].operations.id + " Not Found");

                        } else {
                            if (i == (size - 1)) {
                                resolve('');
                            }
                        }
                    });

                } else {
                    resolve('');
                }



            }, function (err) {
                if (err) {
                    //handle the error if the query throws an error
                    console.log('Returning 1');
                    reject(error);
                } else {
                    //whatever you wanna do after all the iterations are done
                    console.log('Returning 2');
                    resolve('');
                }
            }), function () {
                console.log('Returning 3');
            };
        } else {
            resolve('');
        }

    });

};

Rule.checkActionValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (newRule.actionList.length > 0) {
            let size = newRule.actionList.length;
            ptsasync.forEachOf(newRule.actionList, function (dataElement, i, inner_callback) {
                if (null != dataElement.eventType) {
                    sql.query(`SELECT et.id  FROM eventtype et
                    where et.id = ${dataElement.eventType.id}`, function (err, res) {
                        if (err) {
                            sql.rollback(function () {
                                reject(error);
                            });
                        }
                        if (res.length <= 0) {
                            resolve("Event Type ID " + newRule.actionList[i].eventType.id + " Not Found");

                        } else {
                            if (i == (size - 1)) {
                                resolve('');
                            }
                        }
                    });

                } else {
                    resolve('');
                }



            }, function (err) {
                if (err) {
                    //handle the error if the query throws an error
                    console.log('Returning 1');
                    reject(error);
                } else {
                    //whatever you wanna do after all the iterations are done
                    console.log('Returning 2');
                    resolve('');
                }
            }), function () {
                console.log('Returning 3');
            };
        } else {
            resolve('');
        }

    });

};

Rule.checkRuleConfigObjectValidData = (newRule) => {
    return new Promise((resolve, reject) => {
        if (null != newRule.ruleConfigObjectList && newRule.ruleConfigObjectList.length > 0) {
            let size = newRule.ruleConfigObjectList.length;
            ptsasync.forEachOf(newRule.ruleConfigObjectList, function (dataElement, i, inner_callback) {
                sql.query(`SELECT co.id  FROM configobject co where co.id
                 = ${dataElement.configobject}`, function (err, res) {
                    if (err) {
                        sql.rollback(function () {
                            reject(error);
                        });
                    }
                    if (res.length <= 0) {
                        resolve("Configuration Object ID " + newRule.ruleConfigObjectList[i].configobject + " Not Found");

                    } else {
                        if (i == (size - 1)) {
                            resolve('');
                        }
                    }
                });
            }, function (err) {
                if (err) {
                    //handle the error if the query throws an error
                    console.log('Returning 1');
                    reject(error);
                } else {
                    //whatever you wanna do after all the iterations are done
                    console.log('Returning 2');
                    resolve('');
                }
            }), function () {
                console.log('Returning 3');
            };
        } else {
            resolve('');
        }

    });

};





/* Create Rule Details */
Rule.create = (newRule, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = createValidate(newRule, resJson);
    if (resJson) {
        result(null, resJson);
        return;
    }
    Rule.checkSpaceValidData(newRule)
        .then((answer) => {
            /*Return Error msg if any */
            if (answer) {
                resJson = failJson(resJson, answer)
                result(null, resJson);
                return;
            } else {
                Rule.checkActionValidData(newRule)
                    .then((answer) => {
                        /*Return Error msg if any */
                        if (answer) {
                            resJson = failJson(resJson, answer)
                            result(null, resJson);
                            return;
                        } else {
                            Rule.checkRuleConfigObjectValidData(newRule)
                                .then((answer) => {
                                    /*Return Error msg if any */
                                    if (answer) {
                                        resJson = failJson(resJson, answer)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        Rule.checkExpressionOperationValidData(newRule)
                                            .then((answer) => {
                                                /*Return Error msg if any */
                                                if (answer) {
                                                    resJson = failJson(resJson, answer)
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    Rule.checkExpressionConfigObjectValidData(newRule)
                                                        .then((answer) => {
                                                            /*Return Error msg if any */
                                                            if (answer) {
                                                                resJson = failJson(resJson, answer)
                                                                result(null, resJson);
                                                                return;
                                                            } else {
                                                                Rule.checkExpressionConfigObjectAttributeValidData(newRule)
                                                                    .then((answer) => {
                                                                        /*Return Error msg if any */
                                                                        if (answer) {
                                                                            resJson = failJson(resJson, answer)
                                                                            result(null, resJson);
                                                                            return;
                                                                        } else {
                                                                            createRuleDetails(newRule, resJson, result);
                                                                        }

                                                                    })
                                                                    // similar to "catch"
                                                                    .catch((error) => {
                                                                        console.log("error", error);
                                                                    });
                                                            }

                                                        })
                                                        // similar to "catch"
                                                        .catch((error) => {
                                                            console.log("error", error);
                                                        });


                                                }

                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });

                                    }

                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });

                        }


                    })
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });

            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};


Rule.delete = (ruleId, result) => {
    let resJson = {};
    /* Check Valid Fields */
    /*Check Device is in System  */
    Rule.getRuleDetails(ruleId)
        .then((answer) => {
            if (!answer) {
                var errormsg = 'Rule Not Found ';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;


            } else {
                sql.query("DELETE FROM action WHERE rule = ?", ruleId, function (err, res3) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                });

                sql.query("DELETE FROM ruleconfigobject WHERE rule = ?", ruleId, function (err, res3) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                });

                sql.query("DELETE FROM expression WHERE rule = ?", ruleId, function (err, res3) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                });


                sql.query("DELETE FROM rule WHERE id = ?", ruleId, function (err, res3) {
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
};

// Retrieve all Rules from the database.
Rule.getAll = result => {
    let resJson = {};
    let ruleList = [];
    let actionList = [];
    Rule.getRuleList()
        .then((response) => {
            if (!response) {
                var msg = "RuleList Featched Successfully";
                resJson = sucessJson(response, resJson, msg);
                result(null, resJson);
                return;


            } else {
                /*Get Rule List*/
                for (let i = 0; i < response.length; i++) {
                    let actionList = [];
                    let ruleConfigObjectList = [];
                    let expressionList = [];
                    let rule = {};
                    let space = null;
                    if (null != response[i].spaceid) {
                        space = {
                            id: response[i].spaceid,
                            name: response[i].spacename
                        }
                    }
                    let rulestatus = null;
                    if (null != response[i].rulestatusid) {
                        rulestatus = {
                            id: response[i].rulestatusid,
                            status: response[i].rulestatus,
                            description: response[i].rulestatusdescription

                        }
                    }
                    if (null != response[i].id) {
                        rule = {
                            id: response[i].id,
                            name: response[i].name,
                            definition: response[i].definition,
                            createdon: response[i].createdon,
                            updatedon: response[i].updatedon,
                            space: space,
                            rulestatus: rulestatus,
                            actionList: actionList,
                            ruleConfigObjectList: ruleConfigObjectList,
                            expressionList: expressionList

                        }
                        ruleList.push(rule);
                    }

                }
                /*Get Action List and Set To Rule List*/
                let ruleDataList = [];
                Action.getActionList()
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            ruleDataList = addAction(response, ruleDataList, ruleList);
                            RuleConfigObject.getRuleConfigObjectList()
                                .then((response) => {
                                    if (response) {
                                        ruleDataList = addRuleConfigObject(response, ruleDataList);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addConfigObjectAtributes(response, ruleDataList);
                                                    Expression.getExpressionList()
                                                        .then((response) => {
                                                            if (response) {
                                                                ruleDataList = addExpression(response, ruleDataList);
                                                                var msg = "RuleList Featched Successfully";
                                                                resJson = sucessJson(ruleDataList, resJson, msg);
                                                                result(null, resJson);
                                                                return;
                                                            } else {
                                                                /*Rule has no expression* */
                                                                var msg = "RuleList Featched Successfully";
                                                                resJson = sucessJson(ruleDataList, resJson, msg);
                                                                result(null, resJson);
                                                                return;
                                                            }
                                                        })

                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /*rule has action but not ruleconfigObject  */
                                        Expression.getExpressionList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addExpression(response, ruleDataList);
                                                    var msg = "RuleList Featched Successfully";
                                                    resJson = sucessJson(ruleDataList, resJson, msg);
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    /*Rule has no expression* */
                                                    var msg = "RuleList Featched Successfully";
                                                    resJson = sucessJson(ruleDataList, resJson, msg);
                                                    result(null, resJson);
                                                    return;
                                                }
                                            })

                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        } else {
                            /*rule has no action  */
                            RuleConfigObject.getRuleConfigObjectList()
                                .then((response) => {

                                    if (response) {
                                        ruleDataList = addRuleConfigObject(response, ruleList);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addConfigObjectAtributes(response, ruleDataList);
                                                    Expression.getExpressionList()
                                                        .then((response) => {
                                                            console.log("response", JSON.stringify(response))
                                                            if (response) {

                                                                ruleDataList = addExpression(response, ruleDataList);
                                                                var msg = "RuleList Featched Successfully";
                                                                resJson = sucessJson(ruleDataList, resJson, msg);
                                                                result(null, resJson);
                                                                return;
                                                            } else {
                                                                /*Rule has no expression* */
                                                                var msg = "RuleList Featched Successfully";
                                                                resJson = sucessJson(ruleDataList, resJson, msg);
                                                                result(null, resJson);
                                                                return;
                                                            }
                                                        })
                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /**No actionList No ConfigObjectList */
                                        Expression.getExpressionList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = ruleList;
                                                    ruleDataList = addExpression(response, ruleDataList);
                                                    var msg = "RuleList Featched Successfully";
                                                    resJson = sucessJson(ruleDataList, resJson, msg);
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    /*Rule has no expression* */
                                                    var msg = "RuleList Featched Successfully";
                                                    resJson = sucessJson(ruleDataList, resJson, msg);
                                                    result(null, resJson);
                                                    return;
                                                }
                                            })

                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        }
                    })
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });
            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });

};

function getconfigObjectList(res, configObjectList) {
    let configObject = {};


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
}

function getExpressionList(res, expressionList) {
    let expression = {};
    for (let i = 0; i < res.length; i++) {
        let operations = null;
        if (null != res[i].operationsid) {
            operations = {
                id: res[i].operationsid,
                name: res[i].operationsname,
                lable: res[i].operationslable
            }
        }
        let rule = null;
        if (null != res[i].ruleid) {
            rule = {
                id: res[i].ruleid,
                name: res[i].rulename
            }
        }
        let configObject = null;
        if (null != res[i].configobjectid) {
            configObject = {
                id: res[i].configobjectid,
                name: res[i].configobjectname,
                description: res[i].configobjectdescription
            }
        }

        let configObjectAttribute = null
        if (null != res[i].configobjectattributeid) {
            let datatype = null
            if (null != res[i].datatypesid) {
                datatype = {
                    id: res[i].datatypesid,
                    name: res[i].datatypesname
                }
            }

            configObjectAttribute = {
                id: res[i].configobjectattributeid,
                description: res[i].configobjectattributedescription,
                datatype: datatype
            }

        }
        expression = {
            id: res[i].id,
            name: res[i].name,
            value: res[i].value,
            rule: rule,
            operations: operations,
            configObject: configObject,
            configObjectAttribute: configObjectAttribute
        }
        expressionList.push(expression)
    }
    return expressionList;
}

function addConfigObjectAtributes(res, ruleDataList) {

    let configObjectList = [];
    configObjectList = getconfigObjectList(res, configObjectList)
    for (let i = 0; i < ruleDataList.length; i++) {
        for (let j = 0; j < ruleDataList[i].ruleConfigObjectList.length; j++) {

            for (let k = 0; k < configObjectList.length; k++) {
                if (configObjectList[k].id == ruleDataList[i].ruleConfigObjectList[j].configobjectDetails.id) {
                    for (let l = 0; l < configObjectList[k].attributeList.length; l++) {
                        let datatype = {};
                        datatype = {
                            id: configObjectList[k].attributeList[l].datatypes.id,
                            name: configObjectList[k].attributeList[l].datatypes.name
                        }

                        let attribute = {};
                        attribute = {
                            id: configObjectList[k].attributeList[l].id,
                            name: configObjectList[k].attributeList[l].name,
                            datatype: datatype
                        }
                        ruleDataList[i].ruleConfigObjectList[j].configobjectDetails.attributeList.push(attribute)
                    }
                }
            }
        }
    }
    return ruleDataList;

}


function addExpression(res, ruleDataList) {

    let expressionList = []
    expressionList = getExpressionList(res, expressionList)

    for (let i = 0; i < ruleDataList.length; i++) {
        for (let j = 0; j < expressionList.length; j++) {
            if (expressionList[j] != null && expressionList[j].rule != null && ruleDataList[i].id == expressionList[j].rule.id) {
                ruleDataList[i].expressionList.push(expressionList[j])
            }
        }
    }
    return ruleDataList;

}

function addRuleConfigObject(response, ruleDataList) {
    let ruleConfigObjectList = [];
    let ruleData = {};
    for (let i = 0; i < response.length; i++) {
        let ruleConfigObject = {};
        if (null != response[i].id) {
            if (null != response[i].configobjectid) {
                configobjectDetails = {
                    id: response[i].configobjectid,
                    name: response[i].configobjectname,
                    description: response[i].configobjectdescription

                }
            }


            ruleConfigObject = {
                id: response[i].id,
                rule: response[i].rule,
                configobject: response[i].configobject,
                configobjectDetails: configobjectDetails
            }
            ruleConfigObjectList.push(ruleConfigObject)
        }


    }
    let ruleDataList1 = [];
    for (let i = 0; i < ruleDataList.length; i++) {
        let ruleConfigObjectList1 = [];
        let expressionList1 = [];
        ruleData = {
            id: ruleDataList[i].id,
            name: ruleDataList[i].name,
            definition: ruleDataList[i].definition,
            createdon: ruleDataList[i].createdon,
            updatedon: ruleDataList[i].updatedon,
            rulestatus: ruleDataList[i].rulestatus,
            space: ruleDataList[i].space,
            actionList: ruleDataList[i].actionList,

            ruleConfigObjectList: ruleConfigObjectList1,
            expressionList: expressionList1

        }

        for (let j = 0; j < ruleConfigObjectList.length; j++) {
            if (ruleDataList[i].id == ruleConfigObjectList[j].rule) {
                let configobjectDetails = {};
                let attributeList = [];
                if (null != ruleConfigObjectList[j]) {
                    configobjectDetails = {
                        id: ruleConfigObjectList[j].configobjectDetails.id,
                        name: ruleConfigObjectList[j].configobjectDetails.name,
                        description: ruleConfigObjectList[j].description,
                        attributeList: attributeList

                    }
                }



                let ruleConfig = {};
                ruleConfig = {
                    id: ruleConfigObjectList[j].id,
                    rule: ruleConfigObjectList[j].rule,
                    configobject: ruleConfigObjectList[j].configobject,
                    configobjectDetails: configobjectDetails

                }
                ruleData.ruleConfigObjectList.push(ruleConfig)
            }
        }
        ruleDataList1.push(ruleData);

    }
    return ruleDataList1;


}

function addAction(response, ruleDataList, ruleList) {
    let actionDetailsList = [];
    let ruleConfigObjectList = [];
    /*Get ActionList List*/
    for (let i = 0; i < response.length; i++) {
        let action = {};
        if (null != response[i].actionid) {
            let eventType = null;

            if (null != response[i].eventtypeid) {
                eventType = {
                    id: response[i].eventtypeid,
                    type: response[i].eventtype,
                    description: response[i].eventtypedescription
                }
            }

            action = {
                id: response[i].actionid,
                name: response[i].actionname,
                command: response[i].actionacommand,
                rule: response[i].ruleid,
                eventType: eventType
            }
            actionDetailsList.push(action);
        }

    }
    let ruleData = {};
    for (let i = 0; i < ruleList.length; i++) {
        let actionList = [];
        let expressionList = [];
        let space = null;

        if (null != ruleList[i].space) {
            space = {
                id: ruleList[i].space.id,
                name: ruleList[i].space.name
            }
        }
        let rulestatus = null;
        if (null != ruleList[i].rulestatus) {
            rulestatus = {
                id: ruleList[i].rulestatus.id,
                status: ruleList[i].rulestatus.status,
                description: ruleList[i].rulestatus.description

            }
        }

        ruleData = {
            id: ruleList[i].id,
            name: ruleList[i].name,
            createdon: ruleList[i].createdon,
            updatedon: ruleList[i].updatedon,
            definition: ruleList[i].definition,
            space: space,
            rulestatus: rulestatus,
            actionList: actionList,
            ruleConfigObjectList: ruleConfigObjectList,
            expressionList: expressionList
        }
        for (let j = 0; j < actionDetailsList.length; j++) {

            if (ruleList[i].id == actionDetailsList[j].rule) {
                let action1 = {};
                action1 = {
                    id: actionDetailsList[j].id,
                    name: actionDetailsList[j].name,
                    command: actionDetailsList[j].command,
                    eventType: actionDetailsList[j].eventType

                }
                ruleData.actionList.push(action1)
            }
        }
        ruleDataList.push(ruleData);
    }


    return ruleDataList;
}

Rule.getRuleList = () => {
    return new Promise((resolve, reject) => {

        sql.query(`SELECT r.id,r.name,r.definition,r.createdon,r.updatedon, sp.id as spaceid,sp.name as spacename,rs.id as rulestatusid,rs.status as rulestatus,rs.description as rulestatusdescription  FROM rule r  left join space sp on r.space=sp.id left join rulestatus rs on r.rulestatus=rs.id`, function (err, res) {
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


Rule.getRuleDetails = (ruleId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT r.id,r.name,r.definition,r.createdon,r.updatedon, sp.id as spaceid,sp.name as spacename, rs.id as rulestatusid,rs.status as rulestatus,rs.description as rulestatusdescription FROM rule r left join space sp on r.space=sp.id left join rulestatus rs on r.rulestatus=rs.id
        where r.id = ${ruleId}`, function (err, res) {
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

/* Create Json for Suceess Device */


/* Create Json for Suceess Rule */
function sucessJson(ruleList, resJson, msg) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": ruleList,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};

/* Create Json for Fail Rule */
function failJson(resJson, errormsg) {
    resJson = {
        "status": "FAIL",
        "data": null,
        "msg": null,
        "errormsg": errormsg

    }
    return resJson;
};

/* Create Json for Suceess Rule */
function sucessJsonObject(rule, resJson, msg) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": rule,
        "msg": msg,
        "errormsg": "",

    }
    return resJson;
};

/* Create Json for delete Rule */
function deleteSuccessJson(resJson) {
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": null,
        "msg": "Rule Deleted Successfully",
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


// Find a single Rule with  a RuleId
Rule.findById = (ruleId, result) => {
    let resJson = {};
    Rule.getRuleDetails(ruleId)
        .then((response) => {
            if (!response) {
                var errormsg = 'Rule Not Found for Id';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;

            } else {
                /*Get Rule Details*/
                let actionList = [];
                let ruleConfigObjectList = [];
                let expressionList = [];
                let rule = {};
                let space = null;
                if (null != response[0].spaceid) {
                    space = {
                        id: response[0].spaceid,
                        name: response[0].spacename
                    }
                }
                let rulestatus = null;
                if (null != response[0].rulestatusid) {
                    rulestatus = {
                        id: response[0].rulestatusid,
                        status: response[0].rulestatus,
                        description: response[0].rulestatusdescription

                    }
                }
                if (null != response[0].id) {
                    rule = {
                        id: response[0].id,
                        name: response[0].name,
                        definition: response[0].definition,
                        createdon: response[0].createdon,
                        updatedon: response[0].updatedon,
                        space: space,
                        rulestatus: rulestatus,
                        actionList: actionList,
                        ruleConfigObjectList: ruleConfigObjectList,
                        expressionList: expressionList

                    }

                }
                /*Get Action List and Set To Rule*/
                let ruleDataList = [];
                Action.findByRule(rule.id)
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            rule = addActiontoRule(response, rule)
                            RuleConfigObject.findByRule(rule.id)
                                .then((response) => {
                                    if (response) {
                                        rule = addRuleConfigObjecttoRule(response, rule);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    rule = addConfigObjectAtributestoConfigObject(response, rule);
                                                    Expression.findByRule(rule.id)
                                                        .then((response) => {
                                                            if (response) {
                                                                rule = addExpressiontoRule(response, rule);
                                                                var msg = "Rule Feached Successfully";
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                result(null, resJson);
                                                                return;

                                                            } else {
                                                                var msg = "Rule Feached Successfully";
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                result(null, resJson);
                                                                return;

                                                            }
                                                        })

                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /*rule has action but not ruleconfigObject  */

                                        Expression.findByRule(rule.id)
                                            .then((response) => {

                                                if (response) {
                                                    var msg = "Rule Feached Successfully";
                                                    rule = addExpressiontoRule(response, rule);
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    result(null, resJson);
                                                    return;

                                                } else {
                                                    var msg = "Rule Feached Successfully";
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    result(null, resJson);
                                                    return;
                                                }
                                            })

                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        } else {
                            /*rule has no action  */

                            RuleConfigObject.findByRule(rule.id)
                                .then((response) => {

                                    if (response) {
                                        rule = addRuleConfigObjecttoRule(response, rule);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    rule = addConfigObjectAtributestoConfigObject(response, rule);
                                                    var msg = "Rule Feached Successfully";
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    result(null, resJson);
                                                    return;
                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /**No actionList No ConfigObjectList */
                                        var msg = "Rule Feached Successfully";
                                        resJson = sucessJsonObject(rule, resJson, msg);
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
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });
            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};


// Find a single Rule with  a RuleId
function getById(ruleId, rule, resJson, result, msg) {
    Rule.getRuleDetails(ruleId)
        .then((response) => {
            if (!response) {
                var errormsg = "Rule Not Found for Id";
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;

            } else {
                /*Get Rule Details*/
                let actionList = [];
                let expressionList = [];
                let ruleConfigObjectList = [];

                let space = null;
                if (null != response[0].spaceid) {
                    space = {
                        id: response[0].spaceid,
                        name: response[0].spacename
                    }
                }
                let rulestatus = null;
                if (null != response[0].rulestatusid) {
                    rulestatus = {
                        id: response[0].rulestatusid,
                        status: response[0].rulestatus,
                        description: response[0].rulestatusdescription

                    }
                }
                if (null != response[0].id) {
                    rule = {
                        id: response[0].id,
                        name: response[0].name,
                        definition: response[0].definition,
                        createdon: response[0].createdon,
                        updatedon: response[0].updatedon,
                        space: space,
                        rulestatus: rulestatus,
                        actionList: actionList,
                        ruleConfigObjectList: ruleConfigObjectList,
                        expressionList: expressionList

                    }

                }
                /*Get Action List and Set To Rule*/
                Action.findByRule(rule.id)
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            rule = addActiontoRule(response, rule)
                            RuleConfigObject.findByRule(rule.id)
                                .then((response) => {
                                    if (response) {
                                        rule = addRuleConfigObjecttoRule(response, rule);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    rule = addConfigObjectAtributestoConfigObject(response, rule);
                                                    Expression.findByRule(rule.id)
                                                        .then((response) => {

                                                            if (response) {
                                                                /*rule has Expression*/
                                                                rule = addExpressiontoRule(response, rule);
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                sql.commit(function (err) {
                                                                    if (err) {
                                                                        sql.rollback(function () {
                                                                            throw err;
                                                                        });
                                                                    }
                                                                });
                                                                result(null, resJson);
                                                                return;

                                                            } else {
                                                                /*rule has no Expression*/
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                sql.commit(function (err) {
                                                                    if (err) {
                                                                        sql.rollback(function () {
                                                                            throw err;
                                                                        });
                                                                    }
                                                                });
                                                                result(null, resJson);
                                                                return;

                                                            }
                                                        })



                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /*rule has action but not ruleconfigObject  */
                                        Expression.findByRule(rule.id)
                                            .then((response) => {
                                                if (response) {
                                                    rule = addExpressiontoRule(response, rule);
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    sql.commit(function (err) {
                                                        if (err) {
                                                            sql.rollback(function () {
                                                                throw err;
                                                            });
                                                        }
                                                    });
                                                    result(null, resJson);
                                                    return;

                                                } else {

                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    sql.commit(function (err) {
                                                        if (err) {
                                                            sql.rollback(function () {
                                                                throw err;
                                                            });
                                                        }
                                                    });
                                                    result(null, resJson);
                                                    return;
                                                }
                                            })

                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        } else {
                            /*rule has no action  */

                            RuleConfigObject.findByRule(rule.id)
                                .then((response) => {

                                    if (response) {
                                        rule = addRuleConfigObjecttoRule(response, rule);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    rule = addConfigObjectAtributestoConfigObject(response, rule);

                                                    Expression.findByRule(rule.id)
                                                        .then((response) => {
                                                            if (response) {
                                                                rule = addExpressiontoRule(response, rule);
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                sql.commit(function (err) {
                                                                    if (err) {
                                                                        sql.rollback(function () {
                                                                            throw err;
                                                                        });
                                                                    }
                                                                });
                                                                result(null, resJson);
                                                                return;
                                                            } else {
                                                                resJson = sucessJsonObject(rule, resJson, msg)
                                                                sql.commit(function (err) {
                                                                    if (err) {
                                                                        sql.rollback(function () {
                                                                            throw err;
                                                                        });
                                                                    }
                                                                });
                                                                result(null, resJson);
                                                                return;
                                                            }
                                                        })

                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /**No actionList No ConfigObjectList then check rule has expression */

                                        Expression.findByRule(rule.id)
                                            .then((response) => {
                                                if (response) {
                                                    rule = addExpressiontoRule(response, rule);
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    sql.commit(function (err) {
                                                        if (err) {
                                                            sql.rollback(function () {
                                                                throw err;
                                                            });
                                                        }
                                                    });
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    resJson = sucessJsonObject(rule, resJson, msg)
                                                    sql.commit(function (err) {
                                                        if (err) {
                                                            sql.rollback(function () {
                                                                throw err;
                                                            });
                                                        }
                                                    });
                                                    result(null, resJson);
                                                    return;

                                                }
                                            });

                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        }
                    })
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });

            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};

function addActiontoRule(response, rule) {
    for (let i = 0; i < response.length; i++) {
        let action = {};
        if (null != response[i].actionid) {
            let eventType = null;

            if (null != response[i].eventtypeid) {
                eventType = {
                    id: response[i].eventtypeid,
                    type: response[i].eventtype,
                    description: response[i].eventtypedescription
                }
            }

            action = {
                id: response[i].actionid,
                name: response[i].actionname,
                command: response[i].actionacommand,
                rule: response[i].ruleid,
                eventType: eventType
            }
            rule.actionList.push(action);
        }
    }

    return rule;
}

function addRuleConfigObjecttoRule(response, rule) {
    for (let i = 0; i < response.length; i++) {
        let ruleConfigObject = {};
        if (null != response[i].id) {
            if (null != response[i].configobjectid) {
                let attributeList = [];
                configobjectDetails = {
                    id: response[i].configobjectid,
                    name: response[i].configobjectname,
                    description: response[i].configobjectdescription,
                    attributeList: attributeList

                }
            }
            ruleConfigObject = {
                id: response[i].id,
                rule: response[i].rule,
                configobject: response[i].configobject,
                configobjectDetails: configobjectDetails
            }
            rule.ruleConfigObjectList.push(ruleConfigObject);
        }

    }
    return rule;
}

function addExpressiontoRule(response, rule) {
    for (let i = 0; i < response.length; i++) {
        let expression = {};
        if (null != response[i].id) {
            let operations = null;
            if (null != response[i].operationsid) {
                operations = {
                    id: response[i].operationsid,
                    name: response[i].operationsname,
                    lable: response[i].operationslable
                }
            }
            let configObject = null;
            if (null != response[i].configobjectid) {
                configObject = {
                    id: response[i].configobjectid,
                    name: response[i].configobjectname,
                    description: response[i].configobjectdescription
                }
            }
            let configObjectAttribute = null;
            if (null != response[i].configobjectattributeid) {
                let datatype = null;
                if (null != response[i].datatypesid) {
                    datatype = {
                        id: response[i].datatypesid,
                        name: response[i].datatypesname
                    }
                }

                configObjectAttribute = {
                    id: response[i].configobjectattributeid,
                    description: response[i].configobjectattributedescription,
                    datatype: datatype
                }


            }

            expression = {
                id: response[i].id,
                name: response[i].name,
                value: response[i].value,
                operations: operations,
                configObject: configObject,
                configObjectAttribute: configObjectAttribute
            }
            rule.expressionList.push(expression);
        }

    }
    return rule;
}

function addConfigObjectAtributestoConfigObject(res, rule) {

    let configObjectList = [];
    configObjectList = getconfigObjectList(res, configObjectList)

    for (let j = 0; j < rule.ruleConfigObjectList.length; j++) {

        for (let k = 0; k < configObjectList.length; k++) {
            if (configObjectList[k].id == rule.ruleConfigObjectList[j].configobjectDetails.id) {
                for (let l = 0; l < configObjectList[k].attributeList.length; l++) {
                    let datatype = {};
                    datatype = {
                        id: configObjectList[k].attributeList[l].datatypes.id,
                        name: configObjectList[k].attributeList[l].datatypes.name
                    }

                    let attribute = {};
                    attribute = {
                        id: configObjectList[k].attributeList[l].id,
                        name: configObjectList[k].attributeList[l].name,
                        datatype: datatype
                    }
                    rule.ruleConfigObjectList[j].configobjectDetails.attributeList.push(attribute)
                }
            }
        }
    }
    return rule;
}

/* Rule Create Validator */
function createValidate(newRule, resJson) {

    if (null == newRule) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has Name  */
    if (!newRule.name) {
        var errormsg = 'Rule Name Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has Defination  */
    if (!newRule.definition) {
        var errormsg = 'Rule Defination Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check if Rule Has Space then check Space Id  */
    if (null != newRule.space && !newRule.space.id) {
        var errormsg = 'Space Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has RuleConfigObjectList  */
    if (null != newRule.ruleConfigObjectList && !newRule.ruleConfigObjectList.length > 0) {
        var errormsg = 'Configuration Object Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else {
        /*If Rule Has RuleConfigObjectList then Check  Configobject */
        for (let i = 0; null != newRule.ruleConfigObjectLis && i < newRule.ruleConfigObjectList.length; i++) {
            if (!newRule.ruleConfigObjectList[i].configobject) {
                var errormsg = 'Configuration Object Details Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

        }

    }
    /*If Rule Has ActionList then Check Action Name and Event Type */
    if (newRule.actionList.length > 0) {
        for (let i = 0; i < newRule.actionList.length; i++) {
            if (!newRule.actionList[i].name) {
                var errormsg = 'Action Name Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newRule.actionList[i].eventType && !newRule.actionList[i].command) {
                var errormsg = 'Please select at list one EventType or Command';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

            if (null != newRule.actionList[i].eventType) {
                if (!newRule.actionList[i].eventType.id) {
                    var errormsg = 'Action EventType Not Provided';
                    resJson = failJson(resJson, errormsg)
                    return resJson;

                }
            }
        }
    } else {
        var errormsg = 'Action  Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }

    /*If Rule Has ExpressionList */
    if (newRule.expressionList.length > 0) {
        for (let i = 0; i < newRule.expressionList.length; i++) {
            if (!newRule.expressionList[i].name) {
                var errormsg = 'Expression Name Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newRule.expressionList[i].value) {
                var errormsg = 'Expression Value Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newRule.expressionList[i].operations) {
                var errormsg = 'Expression Operation Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            } else if (!newRule.expressionList[i].operations.id) {
                var errormsg = 'Expression Operation Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newRule.expressionList[i].configObject) {
                var errormsg = 'Expression ConfigObject Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            } else if (!newRule.expressionList[i].configObject.id) {
                var errormsg = 'Expression ConfigObject Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (!newRule.expressionList[i].configObjectAttribute) {
                var errormsg = 'Expression configObject Attribute Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            } else if (!newRule.expressionList[i].configObjectAttribute.id) {
                var errormsg = 'Expression configObject Attribute Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }


        }
    } else {
        var errormsg = 'Expression Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }

}
/* Get RuleData Object */
function getRuleData(newRule, ruleData, rulestatus) {
    var createdon = new Date();
    var space = null
    if (null != newRule.space) {
        space = newRule.space.id;
    }
    ruleData = {
        id: newRule.id,
        name: newRule.name,
        definition: newRule.definition,
        createdon: createdon,
        space: space,
        rulestatus: rulestatus

    }
    return ruleData;
}

Rule.insertExpressionList = (newRule, ruleId) => {
    return new Promise((resolve, reject) => {

        if (newRule.expressionList.length > 0) {

            for (let i = 0; i < newRule.expressionList.length; i++) {
                let expressionData = {};
                let operations = null;
                if (null != newRule.expressionList[i].operations) {
                    operations = newRule.expressionList[i].operations.id
                }
                let configObject = null;
                if (null != newRule.expressionList[i].configObject) {
                    configObject = newRule.expressionList[i].configObject.id
                }
                let configObjectAttribute = null;
                if (null != newRule.expressionList[i].configObject) {
                    configObjectAttribute = newRule.expressionList[i].configObjectAttribute.id
                }

                expressionData = {
                    id: newRule.expressionList[i].id,
                    name: newRule.expressionList[i].name,
                    value: newRule.expressionList[i].value,
                    rule: ruleId,
                    operations: operations,
                    configobject: configObject,
                    attribute: configObjectAttribute
                }
                sql.query("INSERT INTO expression  SET ?", expressionData, function (err, res) {
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
            }
        }
    });
};

Rule.insertActionList = (newRule, ruleId) => {
    return new Promise((resolve, reject) => {

        if (newRule.actionList.length > 0) {

            for (let i = 0; i < newRule.actionList.length; i++) {
                let actionData = {};
                let eventtype = null;
                if (null != newRule.actionList[i].eventType) {
                    eventtype = newRule.actionList[i].eventType.id
                }

                actionData = {
                    id: newRule.actionList[i].id,
                    name: newRule.actionList[i].name,
                    command: newRule.actionList[i].command,
                    rule: ruleId,
                    eventtype: eventtype
                }
                sql.query("INSERT INTO action  SET ?", actionData, function (err, res) {
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
            }
        }
    });
};

Rule.insertRuleConfigObjectList = (newRule, ruleId) => {
    return new Promise((resolve, reject) => {

        if (null != newRule.ruleConfigObjectList && newRule.ruleConfigObjectList.length > 0) {
            for (let i = 0; i < newRule.ruleConfigObjectList.length; i++) {
                let ruleConfigObjectData = {};
                ruleConfigObjectData = {
                    id: newRule.ruleConfigObjectList[i].id,
                    rule: ruleId,
                    configobject: newRule.ruleConfigObjectList[i].configobject,
                }
                sql.query("INSERT INTO ruleconfigobject  SET ?", ruleConfigObjectData, function (err, res) {
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
            }
        }
    });
};

function createRuleDetails(newRule, resJson, result) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        var rulestatus = null;
        RuleStatus.findByStatus()
            .then((answer) => {
                if (answer) {
                    rulestatus = answer[0].id
                }
                let ruleData = {};
                ruleData = getRuleData(newRule, ruleData, rulestatus);
                sql.query("INSERT INTO rule  SET ?", ruleData, function (err, res) {
                    if (err) {
                        console.log("eror " + JSON.stringify(err));
                        sql.rollback(function () {
                            throw err;
                        });
                        resJson = failJson(resJson, err)
                        result(null, resJson);
                        return;
                    }
                    const ruleId = res.insertId;

                    Rule.insertActionList(newRule, ruleId)
                        .then((answer) => {
                        })
                        // similar to "catch"
                        .catch((error) => {
                            console.log("error", error);
                        });
                    Rule.insertRuleConfigObjectList(newRule, ruleId)
                        .then((answer) => {
                        })
                        // similar to "catch"
                        .catch((error) => {
                            console.log("error", error);
                        });

                    Rule.insertExpressionList(newRule, ruleId)
                        .then((answer) => {
                        })
                        // similar to "catch"
                        .catch((error) => {
                            console.log("error", error);
                        });

                    let rule = {}
                    return getById(ruleId, rule, resJson, result, "Rule Created Suceessfully");
                });
            });
    });

}
/*Rule Update  */
Rule.update = (newRule, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateValidate(newRule, resJson);
    if (resJson) {
        result(null, resJson);
        return;
    }
    /*Check Space Data present in System  */
    Rule.checkSpaceValidData(newRule)
        .then((answer) => {
            /*Return Error msg if any */
            if (answer) {
                resJson = failJson(resJson, answer)
                result(null, resJson);
                return;
            } else {
                /*Check Action Data present in System  */
                Rule.checkActionValidData(newRule)
                    .then((answer) => {
                        /*Return Error msg if any */
                        if (answer) {
                            resJson = failJson(resJson, answer)
                            result(null, resJson);
                            return;
                        } else {
                            /*Check RuleConfigObject Data present in System  */
                            Rule.checkRuleConfigObjectValidData(newRule)
                                .then((answer) => {
                                    /*Return Error msg if any */
                                    if (answer) {
                                        resJson = failJson(resJson, answer)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        /*Check Expression Operation Data present in System  */
                                        Rule.checkExpressionOperationValidData(newRule)
                                            .then((answer) => {
                                                /*Return Error msg if any */
                                                if (answer) {
                                                    resJson = failJson(resJson, answer)
                                                    result(null, resJson);
                                                    return;
                                                } else {
                                                    /*Check Expression ConfigObject Data present in System  */
                                                    Rule.checkExpressionConfigObjectValidData(newRule)
                                                        .then((answer) => {
                                                            /*Return Error msg if any */
                                                            if (answer) {
                                                                resJson = failJson(resJson, answer)
                                                                result(null, resJson);
                                                                return;
                                                            } else {
                                                                /*Check Expression ConfigObject Attribute Data present in System  */
                                                                Rule.checkExpressionConfigObjectAttributeValidData(newRule)
                                                                    .then((answer) => {
                                                                        /*Return Error msg if any */
                                                                        if (answer) {
                                                                            resJson = failJson(resJson, answer)
                                                                            result(null, resJson);
                                                                            return;
                                                                        } else {
                                                                            /*Update Rule Details  */
                                                                            updateRuleDetails(newRule, resJson, result);
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                })
                        }


                    })
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });

            }

        })
        // similar to "catch"
        .catch((error) => {
            console.log("error", error);
        });
};





function updateRuleDetails(newRule, resJson, result) {
    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) { throw err; }
        let ruleData = {};
        var rulestatus = null;
        if (newRule.rulestatus != null && newRule.rulestatus.id != null) {
            rulestatus = newRule.rulestatus.id
        }
        /*Get Rule data*/
        ruleData = getRuleData(newRule, ruleData, rulestatus);
        var updatedon = new Date();
        /*Update Rule data */
        sql.query("UPDATE rule SET name = ?, definition = ?, space = ?, rulestatus = ?, updatedon = ? WHERE id = ?", [ruleData.name, ruleData.definition, ruleData.space, ruleData.rulestatus, updatedon, ruleData.id], function (err, res) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
                result(null, err);
                return;
            }

            /*Update action data */
            Rule.updateActionList(newRule)
                .then((answer) => {
                })
                // similar to "catch"
                .catch((error) => {
                    console.log("error", error);
                });
            /*Update RuleConfigObject data */
            Rule.updateRuleConfigObjectList(newRule)
                .then((answer) => {
                })
                // similar to "catch"
                .catch((error) => {
                    console.log("error", error);
                });

            /*Update RuleConfigObject data */
            Rule.updateExpressionList(newRule)
                .then((answer) => {
                })
                // similar to "catch"
                .catch((error) => {
                    console.log("error", error);
                });
            let rule = {}
            /*Get new Created Rule */
            return getById(ruleData.id, rule, resJson, result, "Rule Updated Suceessfully");

        });
    });

}

Rule.updateActionList = (newRule) => {
    return new Promise((resolve, reject) => {

        if (newRule.actionList.length > 0) {
            for (let i = 0; i < newRule.actionList.length; i++) {
                let eventtype = null;
                if (null != newRule.actionList[i].eventType) {
                    eventtype = newRule.actionList[i].eventType.id;
                }


                let actionData = null;
                actionData = {
                    id: newRule.actionList[i].id,
                    name: newRule.actionList[i].name,
                    command: newRule.actionList[i].command,
                    rule: newRule.id,
                    eventtype: eventtype
                }
                if (newRule.actionList[i].action == 'add') {
                    sql.query("INSERT INTO action  SET ?", actionData, function (err, res) {
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
                }

                else if (newRule.actionList[i].action == 'update') {
                    sql.query("UPDATE action SET name = ?, command = ?, eventtype = ? WHERE id = ?",
                        [actionData.name, actionData.command, actionData.eventtype, actionData.id], function (err, res) {
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
                }

                else if (newRule.actionList[i].action == 'delete') {
                    sql.query("DELETE FROM action WHERE id = ?", actionData.id, function (err, res) {
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
                }


            }
        }
    });
};

Rule.updateRuleConfigObjectList = (newRule) => {
    return new Promise((resolve, reject) => {

        if (null != newRule.ruleConfigObjectList && newRule.ruleConfigObjectList.length > 0) {
            for (let i = 0; i < newRule.ruleConfigObjectList.length; i++) {
                let ruleConfigObjectData = {};
                ruleConfigObjectData = {
                    id: newRule.ruleConfigObjectList[i].id,
                    rule: newRule.id,
                    configobject: newRule.ruleConfigObjectList[i].configobject,
                }
                if (newRule.ruleConfigObjectList[i].action == 'add') {
                    sql.query("INSERT INTO ruleconfigobject  SET ?", ruleConfigObjectData, function (err, res) {
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
                }

                if (newRule.ruleConfigObjectList[i].action == 'update') {
                    sql.query("UPDATE ruleconfigobject SET configobject = ? WHERE id = ?",
                        [ruleConfigObjectData.configobject, ruleConfigObjectData.id], function (err, res) {
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
                }

                if (newRule.ruleConfigObjectList[i].action == 'delete') {
                    sql.query("DELETE FROM ruleconfigobject WHERE id = ?", ruleConfigObjectData.id, function (err, res) {
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
                }

            }
        }
    });
};


Rule.updateExpressionList = (newRule) => {
    return new Promise((resolve, reject) => {

        if (newRule.expressionList.length > 0) {
            for (let i = 0; i < newRule.expressionList.length; i++) {
                let expressionData = {};

                expressionData = {
                    id: newRule.expressionList[i].id,
                    name: newRule.expressionList[i].name,
                    value: newRule.expressionList[i].value,
                    rule: newRule.id,
                    operations: newRule.expressionList[i].operations.id,
                    configobject: newRule.expressionList[i].configObject.id,
                    attribute: newRule.expressionList[i].configObjectAttribute.id
                }
                if (newRule.expressionList[i].action == 'add') {
                    sql.query("INSERT INTO expression  SET ?", expressionData, function (err, res) {
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
                }

                if (newRule.expressionList[i].action == 'update') {

                    sql.query("UPDATE expression SET name = ?,value = ?,rule = ?,operations = ?,configobject = ?,attribute = ? WHERE  id = ?",
                        [expressionData.name, expressionData.value, expressionData.rule, expressionData.operations, expressionData.configobject, expressionData.attribute, expressionData.id], function (err, res) {

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
                }

                if (newRule.expressionList[i].action == 'delete') {
                    sql.query("DELETE FROM expression WHERE id = ?", expressionData.id, function (err, res) {
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
                }

            }
        }
    });
};


/* Rule Update Validator */
function updateValidate(newRule, resJson) {

    if (null == newRule) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has ID  */
    if (!newRule.id) {
        var errormsg = 'Rule ID Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has Defination  */
    if (!newRule.definition) {
        var errormsg = 'Rule Defination Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    /*Check Rule Has RuleConfigObjectList  */
    if (null != newRule.ruleConfigObjectList && !newRule.ruleConfigObjectList.length > 0) {
        var errormsg = 'Configuration Object Details Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else {
        /*If Rule Has RuleConfigObjectList then Check  Configobject and Action */
        for (let i = 0; null != newRule.ruleConfigObjectList && i < newRule.ruleConfigObjectList.length; i++) {
            if (!newRule.ruleConfigObjectList[i].action) {
                var errormsg = 'Configuration Object Action Details Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

        }

    }
    /*If Rule Has ActionList then Check Action Action and Event Type */
    if (newRule.actionList.length > 0) {
        for (let i = 0; i < newRule.actionList.length; i++) {
            if (!newRule.actionList[i].action) {
                var errormsg = 'Action Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

            if (!newRule.actionList[i].eventType && !newRule.actionList[i].command) {
                var errormsg = 'Please select at list one EventType or Command';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }

            if (null != newRule.actionList[i].eventType) {
                if (!newRule.actionList[i].eventType.id) {
                    var errormsg = 'Action EventType Not Provided';
                    resJson = failJson(resJson, errormsg)
                    return resJson;

                }
            }

        }
    }

    /*If Rule Has ExpressionList */
    if (newRule.expressionList.length > 0) {
        for (let i = 0; i < newRule.expressionList.length; i++) {
            if (!newRule.expressionList[i].action) {
                var errormsg = 'Expression Action Not Provided';
                resJson = failJson(resJson, errormsg)
                return resJson;
            }
            if (null != newRule.expressionList[i].operations) {
                if (!newRule.expressionList[i].operations.id) {
                    var errormsg = 'Expression Operations Not Provided';
                    resJson = failJson(resJson, errormsg)
                    return resJson;
                }
            }
            if (null != newRule.expressionList[i].configObject) {
                if (!newRule.expressionList[i].configObject.id) {
                    var errormsg = 'Expression ConfigObject Not Provided';
                    resJson = failJson(resJson, errormsg)
                    return resJson;
                }
            }
            if (null != newRule.expressionList[i].configObjectAttribute) {
                if (!newRule.expressionList[i].configObjectAttribute.id) {
                    var errormsg = 'Expression ConfigObject Attribute Not Provided';
                    resJson = failJson(resJson, errormsg)
                    return resJson;
                }
            }

        }
    }

}


Rule.findBySpace = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT r.id,r.name,r.definition,r.createdon,r.updatedon, sp.id as spaceid,sp.name as spacename, rs.id as rulestatusid,rs.status as rulestatus,rs.description as rulestatusdescription FROM rule r left join space sp on r.space=sp.id left join rulestatus rs on r.rulestatus=rs.id
        where r.space = ${spaceId}`, function (err, response) {
            if (err) {
                sql.rollback(function () {
                    reject(error);
                });
            }
            let ruleList = [];
            if (!response.length) {
                resolve('');
            } else {
                /*Get Rule List*/
                for (let i = 0; i < response.length; i++) {

                    let actionList = [];
                    let ruleConfigObjectList = [];
                    let expressionList = [];
                    let rule = {};
                    let space = null;
                    if (null != response[i].spaceid) {
                        space = {
                            id: response[i].spaceid,
                            name: response[i].spacename
                        }
                    }
                    let rulestatus = null;
                    if (null != response[i].rulestatusid) {
                        rulestatus = {
                            id: response[i].rulestatusid,
                            status: response[i].rulestatus,
                            description: response[i].rulestatusdescription

                        }
                    }
                    if (null != response[i].id) {
                        rule = {
                            id: response[i].id,
                            name: response[i].name,
                            definition: response[i].definition,
                            createdon: response[i].createdon,
                            updatedon: response[i].updatedon,
                            space: space,
                            rulestatus: rulestatus,
                            actionList: actionList,
                            ruleConfigObjectList: ruleConfigObjectList,
                            expressionList: expressionList

                        }
                        ruleList.push(rule);
                    }

                }
                /*Get Action List and Set To Rule List*/
                let ruleDataList = [];
                Action.getActionList()
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            ruleDataList = addAction(response, ruleDataList, ruleList);
                            RuleConfigObject.getRuleConfigObjectList()
                                .then((response) => {
                                    if (response) {
                                        ruleDataList = addRuleConfigObject(response, ruleDataList);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addConfigObjectAtributes(response, ruleDataList);
                                                    Expression.getExpressionList()
                                                        .then((response) => {
                                                            if (response) {
                                                                ruleDataList = addExpression(response, ruleDataList);
                                                                resolve(ruleDataList);
                                                            } else {
                                                                resolve(ruleDataList);
                                                            }
                                                        })

                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /*rule has action but not ruleconfigObject  */
                                        Expression.getExpressionList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addExpression(response, ruleDataList);
                                                    resolve(ruleDataList);
                                                } else {
                                                    /*Rule has no expression* */
                                                    resolve(ruleDataList);
                                                }
                                            })
                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        } else {
                            /*rule has no action  */

                            RuleConfigObject.getRuleConfigObjectList()
                                .then((response) => {

                                    if (response) {
                                        ruleDataList = addRuleConfigObject(response, ruleList);
                                        DataObject.getDataObjectList()
                                            .then((response) => {
                                                if (response) {
                                                    ruleDataList = addConfigObjectAtributes(response, ruleDataList);
                                                    Expression.getExpressionList()
                                                    .then((response) => {
                                                        if (response) {
                                                            ruleDataList = addExpression(response, ruleDataList);
                                                            resolve(ruleDataList);
                                                        } else {
                                                            /*Rule has no expression* */
                                                            resolve(ruleDataList);
                                                        }
                                                    })
                                                }
                                            })
                                            // similar to "catch"
                                            .catch((error) => {
                                                console.log("error", error);
                                            });
                                    } else {
                                        /**No actionList No ConfigObjectList */
                                        Expression.getExpressionList()
                                        .then((response) => {
                                            if (response) {
                                                ruleDataList = addExpression(response, ruleDataList);
                                                resolve(ruleDataList);
                                            } else {
                                                /*Rule has no expression* */
                                                resolve(ruleDataList);
                                            }
                                        })
                                    }
                                })
                                // similar to "catch"
                                .catch((error) => {
                                    console.log("error", error);
                                });
                        }
                    })
                    // similar to "catch"
                    .catch((error) => {
                        console.log("error", error);
                    });
            }
        })
    });

};


/* Get Rule Details By Space*/
Rule.getBySpace = (spaceId) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT r.id,r.name,r.definition,r.createdon,r.updatedon, sp.id as spaceid,sp.name as spacename, rs.id as rulestatusid,rs.status as rulestatus,rs.description as rulestatusdescription FROM rule r left join space sp on r.space=sp.id left join rulestatus rs on r.rulestatus=rs.id
        where r.space = ${spaceId}`, function (err, res) {
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


// Retrieve all Rules from the database.
Rule.getAllSimplified = result => {
    let resJson = {};
    let ruleList = [];
    Rule.getRuleList()
        .then((response) => {
            if (!response) {
                /*Empty Rule List*/
                var msg = "Rule List Featched Successfully";
                resJson = sucessJson(ruleList, resJson, msg);
                result(null, resJson);
                return;
            } else {
                /*Get Rule List*/
                for (let i = 0; i < response.length; i++) {
                    let actionList = [];
                    let expressionList = [];
                    let rule = {};
                    if (null != response[i].id) {
                        rule = {
                            id: response[i].id,
                            name: response[i].name,
                            definition: response[i].definition,
                            createdon: response[i].createdon,
                            updatedon: response[i].updatedon,
                            spaceId: response[i].spaceid,
                            spaceName: response[i].spacename,
                            ruleStatusId: response[i].rulestatusid,
                            ruleStatus: response[i].rulestatus,
                            actionList: actionList,
                            expressionList: expressionList
                        }
                        ruleList.push(rule);
                    }
                }
                /*Get Action List and Set To Rule List*/
                let ruleDataList = [];
                Action.getActionList()
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            ruleDataList = addSimplifiedAction(response, ruleDataList, ruleList);
                            /*Get Expression List and Set To Rule List*/
                            Expression.getExpressionList()
                                .then((response) => {
                                    if (response) {
                                        /*If rule have Expression*/
                                        ruleDataList = addSimplifiedExpression(response, ruleDataList);
                                        var msg = "Rule List Featched Successfully";
                                        resJson = sucessJson(ruleDataList, resJson, msg);
                                        result(null, resJson);
                                        return;
                                    } else {
                                        /*Rule has no expression* */
                                        var msg = "Rule List Featched Successfully";
                                        resJson = sucessJson(ruleDataList, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    }
                                })

                        } else {
                            /*rule has no action  */
                            Expression.getExpressionList()
                                .then((response) => {
                                    if (response) {
                                        /*If rule have Expression*/
                                        ruleDataList = ruleList;
                                        ruleDataList = addSimplifiedExpression(response, ruleDataList);
                                        var msg = "Rule List Featched Successfully";
                                        resJson = sucessJson(ruleDataList, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        /*Rule has no expression no action* */
                                        ruleDataList = ruleList;
                                        var msg = "Rule List Featched Successfully";
                                        resJson = sucessJson(ruleDataList, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    }
                                })
                        }
                    })
            }
        })
};

function addSimplifiedAction(response, ruleDataList, ruleList) {
    let actionDetailsList = [];
    /*Get ActionList List*/
    for (let i = 0; i < response.length; i++) {
        let action = {};
        if (null != response[i].actionid) {
            action = {
                id: response[i].actionid,
                name: response[i].actionname,
                command: response[i].actionacommand,
                rule: response[i].ruleid,
                eventTypeId: response[i].eventtypeid,
                eventType: response[i].eventtype,
            }
            actionDetailsList.push(action);
        }

    }
    let ruleData = {};
    for (let i = 0; i < ruleList.length; i++) {
        let actionList = [];
        let expressionList = [];
        ruleData = {
            id: ruleList[i].id,
            name: ruleList[i].name,
            createdon: ruleList[i].createdon,
            updatedon: ruleList[i].updatedon,
            definition: ruleList[i].definition,
            spaceId: ruleList[i].spaceId,
            spaceName: ruleList[i].spaceName,
            ruleStatusId: ruleList[i].ruleStatusId,
            ruleStatus: ruleList[i].ruleStatus,
            actionList: actionList,
            expressionList: expressionList
        }
        for (let j = 0; j < actionDetailsList.length; j++) {

            if (ruleList[i].id == actionDetailsList[j].rule) {
                let action1 = {};
                action1 = {
                    id: actionDetailsList[j].id,
                    name: actionDetailsList[j].name,
                    command: actionDetailsList[j].command,
                    eventTypeId: actionDetailsList[j].eventTypeId,
                    eventType: actionDetailsList[j].eventType,

                }
                ruleData.actionList.push(action1)
            }
        }
        ruleDataList.push(ruleData);
    }
    return ruleDataList;
}

function addSimplifiedExpression(res, ruleDataList) {
    let expressionList = []
    expressionList = getSimplifiedExpressionList(res, expressionList)
    for (let i = 0; i < ruleDataList.length; i++) {
        for (let j = 0; j < expressionList.length; j++) {
            if (ruleDataList[i].id == expressionList[j].ruleId) {
                ruleDataList[i].expressionList.push(expressionList[j])
            }
        }
    }
    return ruleDataList;
}

function getSimplifiedExpressionList(res, expressionList) {
    let expression = {};
    for (let i = 0; i < res.length; i++) {
        expression = {
            id: res[i].id,
            name: res[i].name,
            value: res[i].value,
            ruleId: res[i].ruleid,
            operationsId: res[i].operationsid,
            operationsName: res[i].operationsname,
            configObjectId: res[i].configobjectid,
            configObjectName: res[i].configobjectname,
            configObjectAttributeId: res[i].configobjectattributeid,
            configObjectAttributeDescription: res[i].configobjectattributedescription,
            datatypesId: res[i].datatypesid,
            datatypesName: res[i].datatypesname

        }
        expressionList.push(expression)
    }
    return expressionList;
}

Rule.getSimplified = (ruleId, result) => {
    let resJson = {};
    Rule.getRuleDetails(ruleId)
        .then((response) => {
            if (!response) {
                var errormsg = 'Rule Not Found in System';
                resJson = failJson(resJson, errormsg)
                result(null, resJson);
                return;
            } else {
                /*Get Rule Details*/
                let actionList = [];
                let expressionList = [];
                let rule = {};
                if (null != response[0].id) {
                    rule = {
                        id: response[0].id,
                        name: response[0].name,
                        definition: response[0].definition,
                        createdon: response[0].createdon,
                        updatedon: response[0].updatedon,
                        spaceId: response[0].spaceId,
                        spaceName: response[0].spaceName,
                        ruleStatusId: response[0].ruleStatusId,
                        ruleStatus: response[0].ruleStatus,
                        actionList: actionList,
                        expressionList: expressionList
                    }
                }
                let ruleDataList = [];
                Action.findByRule(rule.id)
                    .then((response) => {
                        if (response) {
                            /*If rule have Action*/
                            rule = addActiontoSimplifiedRule(response, rule)
                            Expression.findByRule(rule.id)
                                .then((response) => {
                                    if (response) {
                                        rule = addExpressiontoSimplifiedRule(response, rule);
                                        var msg = "Rule Feached Successfully";
                                        resJson = sucessJsonObject(rule, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        var msg = "Rule Feached Successfully";
                                        resJson = sucessJsonObject(rule, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    }
                                })
                        } else {
                            /*If rule no Action*/
                            Expression.findByRule(rule.id)
                                .then((response) => {
                                    if (response) {
                                        /*If rule  Expression*/
                                        rule = addExpressiontoSimplifiedRule(response, rule);
                                        var msg = "Rule Feached Successfully";
                                        resJson = sucessJsonObject(rule, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    } else {
                                        /*If rule no Expression,Action*/
                                        var msg = "Rule Feached Successfully";
                                        resJson = sucessJsonObject(rule, resJson, msg)
                                        result(null, resJson);
                                        return;
                                    }
                                })
                        }

                    })

            }
        });
};

function addActiontoSimplifiedRule(response, rule) {
    for (let i = 0; i < response.length; i++) {
        let action = {};
        if (null != response[i].actionid) {
            action = {
                id: response[i].actionid,
                name: response[i].actionname,
                command: response[i].actionacommand,
                rule: response[i].ruleid,
                eventTypeId: response[i].eventtypeid,
                eventType: response[i].eventtype,
            }
            rule.actionList.push(action);
        }
    }
    return rule;
}

function addExpressiontoSimplifiedRule(response, rule) {
    for (let i = 0; i < response.length; i++) {
        let expression = {};
        if (null != response[i].id) {
            expression = {
                id: response[i].id,
                name: response[i].name,
                value: response[i].value,
                operationsId: response[i].operationsid,
                operationsName: response[i].operationsname,
                configObjectId: response[i].configobjectid,
                configObjectName: response[i].configobjectname,
                configObjectAttributeId: response[i].configobjectattributedescription,
                datatypesId: response[i].datatypesid,
                datatypesName: response[i].datatypesname
            }
            rule.expressionList.push(expression);
        }
    }
    return rule;
}


/* Update Rule Details */
Rule.updateRuleStatus = (newRule, result) => {
    let resJson = {};
    /* Check Valid Fields */
    resJson = updateRuleStatusValidate(newRule, resJson);
    if (!resJson) {
        /* Begin transaction */
        sql.beginTransaction(function (err) {
            if (err) { throw err; }
            /**Check Rule is in System */
            Rule.getRuleDetails(newRule.id)
                .then((answer) => {
                    /*Return Error msg if any */
                    if (!answer) {
                        var errormsg = 'Rule Not Found in System ';
                        resJson = failJson(resJson, errormsg)
                        result(null, resJson);
                        return;
                    } else {

                        /**Check Rule status is in System */
                        RuleStatus.findById(newRule.rulestatus.id)
                            .then((answer) => {
                                /*Return Error msg if any */
                                if (!answer) {
                                    var errormsg = 'Rule Status Not Found in System ';
                                    resJson = failJson(resJson, errormsg)
                                    result(null, resJson);
                                    return;
                                } else {
                                    updateRuleStatusData(newRule, resJson, result);

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


function updateRuleStatusData(newRule, resJson, result) {
    var updatedon = new Date();
    sql.query("UPDATE rule  SET updatedon = ?, rulestatus = ? WHERE id = ?",
        [updatedon, newRule.rulestatus.id, newRule.id], function (err, res) {
            if (err) {
                console.log("eror " + JSON.stringify(err));
                sql.rollback(function () {
                    throw err;
                });
            }
            /* Get Updated Space */
            let rule = {};
            return getById(newRule.id, rule, resJson, result, "Rule Updated Suceessfully");

        });

}

/* Update RuleStatus Validator */
function updateRuleStatusValidate(newRule, resJson) {
    if (null == newRule) {
        var errormsg = 'Invalid Data';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newRule.id) {
        var errormsg = 'Rule Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }
    if (!newRule.rulestatus) {
        var errormsg = 'Rule Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    } else if (!newRule.rulestatus.id) {
        var errormsg = 'Rule Status Not Provided';
        resJson = failJson(resJson, errormsg)
        return resJson;
    }


}


module.exports = Rule;