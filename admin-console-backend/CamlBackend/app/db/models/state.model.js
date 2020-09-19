const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const State = function (state) {
    this.id = state.id;
    this.name = state.name;
};
// Find a single State with a StateId
State.findById = (stateId, result) => {
    sql.query(`SELECT s.id,s.name, c.id as country,c.name as cname FROM state s  Left JOIN country c ON s.country=c.id where s.id = ${stateId}`, (err, res) => {
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
            var errormsg = 'State Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all State from the database.
State.getAll = result => {
    sql.query(" SELECT s.id,s.name, c.id as country,c.name as cname FROM state s  Left JOIN country c ON s.country=c.id ", (err, res) => {
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


function findcountry() {

    let finalList = [];
    let countryList = [];
    sql.query(" SELECT s.id,s.name, c.id as country,c.name as countryName FROM state s  RIGHT JOIN country c ON s.country=c.id order by country ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length != 0) {
            let countrystateList = [];
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
            return countrystateList;
        }

    });

};


State.findCountryWithStates = result => {
    let finalList = [];
    let countryList = [];
    console.log("start");
    sql.query(" SELECT s.id,s.name, c.id as country,c.name as countryName FROM state s  RIGHT JOIN country c ON s.country=c.id order by country ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length != 0) {
            let countrystateList = [];
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
            return countrystateList;
        }

    });
};









function sucessJsonList(res, resJson) {
    let stateList = [];
    let state = {};
    for (let i = 0; i < res.length; i++) {
        if (null == res[i].country) {
            state = {
                id: res[i].id,
                name: res[i].name,
                country: null

            }
        } else {
            state = {
                id: res[i].id,
                name: res[i].name,
                country: {
                    id: res[i].country,
                    name: res[i].cname
                }

            }
        }


        stateList.push(state)

        let data = {};
        resJson = {
            "status": "SUCCESS",
            "data": stateList,
            "msg": null,
            "errormsg": "",

        }


    }
    if (res.length == 0) {
        resJson = {
            "status": "SUCCESS",
            "data": [],
            "msg": null,
            "errormsg": "",

        }
    }
    return resJson;
};

function sucessJson(res, resJson) {
    if (null == res[0].country) {
        state = {
            id: res[0].id,
            name: res[0].name,
            country: null

        }
    } else {
        state = {
            id: res[0].id,
            name: res[0].name,
            country: {
                id: res[0].country,
                name: res[0].cname
            }

        }
    }
    resJson = {
        "status": "SUCCESS",
        "data": state,
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
module.exports = State;
