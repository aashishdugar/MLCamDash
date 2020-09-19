const sql = require("../db.js");
const { json } = require("body-parser");

// constructor
const Country = function (country) {
    this.id = country.id;
    this.name = country.name;
};
// Find a single Country with a CountryId
Country.findById = (countryId, result) => {
    sql.query(`SELECT c.id,c.name FROM country c where c.id = ${countryId}`, (err, res) => {
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
            var errormsg = 'Country Not Found for Id';
            resJson = failJson(resJson, errormsg)
            result(null, resJson);
            return;

        }
    });
};

// Retrieve all Country from the database.
Country.getAll = result => {
    sql.query(" SELECT c.id,c.name FROM country c where c.id ", (err, res) => {
        if (err) {
            console.log("error: ", JSON.stringify(err));
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
    let country = {};
    let countryList = [];
    for (let i = 0; i < res.length; i++) {
        country = {
            id: res[i].id,
            name: res[i].name
        }
        countryList.push(country)
    }
    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": countryList,
        "msg": null,
        "errormsg": "",

    }
    return resJson;
};

function sucessJson(res, resJson) {
    let country = {};
    country = {
        id: res[0].id,
        name: res[0].name
    }

    let data = {};
    resJson = {
        "status": "SUCCESS",
        "data": country,
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

module.exports = Country;
