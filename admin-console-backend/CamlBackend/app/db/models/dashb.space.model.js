const influx = require("../influxdb.js");
const { json } = require("body-parser");

const DashboardSpace = function (dataObject) {
    this.id = dataObject.id;
    this.name = dataObject.name
};



validateData=(requestdata)=>{
    console.log('Validating'+JSON.stringify(requestdata));
    if(null == requestdata){
        return "Input Not Provided";
    }
    if(undefined == requestdata.spaceId || null == requestdata.spaceId || '' ==requestdata.spaceId ){
        return "SpaceId Not Provided";
    }
    if(undefined == requestdata.from || null == requestdata.from || '' ==requestdata.from ){
        return "From Date Not Provided";
    }
    if(undefined == requestdata.to || null == requestdata.to || '' ==requestdata.to ){
        return "To Date Not Provided";
    }
    return '';
}

validateSpaceIdData=(requestdata)=>{
    console.log('Validating'+JSON.stringify(requestdata));
    if(null == requestdata){
        return "Input Not Provided";
    }
    if(null == requestdata.spaceId || '' ==requestdata.spaceId ){
        return "SpaceId Not Provided";
    }
    return '';
}
validateGroupByData=(requestdata)=>{
    console.log('Validating'+JSON.stringify(requestdata));
    console.log(requestdata.groupBy);
    if(null == requestdata){
        return "Input Not Provided";
    }else if( requestdata.groupBy == undefined || null == requestdata.groupBy || '' ==requestdata.groupBy ){
        return "Group By Not Provided";
    }else {
        var groubyvalues = ["h", "m", "s", "d"];
        var v = groubyvalues.includes(requestdata.groupBy);
        if(v == false){
            return "Group By Must Contains One of ('h', 'm', 's', 'd')";
        }else{
            return '';
        }
        
    }
    
    
}
DashboardSpace.spacedensity = (requestdata, result) => {
    let resJson = {"status": "","data": {},"msg": "","errormsg": ""};
    let validation=validateData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    let spaceId = requestdata.spaceId;
    let from = requestdata.from;
    let to = requestdata.to;
    let query = "select * from density_change where space_id='" + spaceId+ "' and time >='" + from + "' and time <='" + to + "'";
    influx.query(query)
        .catch(err => {
            console.log(err);
            resJson.status = "FAIL";
            resJson.errormsg = err;
            result(null,resJson);
        }).then(results => {
            resJson.status = "SUCCESS";
            resJson.data = results;
            result(null, resJson);
            return;
        });
};

DashboardSpace.getSpaceCurrentDensity = (requestdata, result) => {
    let resJson = {"status": "","data": {},"msg": "","errormsg": ""};
    let validation=validateSpaceIdData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    let spaceId = requestdata.spaceId;
    let query = "select * from density_change where space_id='" + spaceId + "' ORDER BY desc LIMIT 1";
    influx.query(query)
        .catch(err => {
            console.log(err);
            resJson.status = "FAIL";
            resJson.errormsg = err;
            result(null,resJson);
        }).then(results => {

            resJson.status = "SUCCESS";
            resJson.data = results;
            result(null, resJson);
            return;
        });

};
DashboardSpace.getSpaceDensityCountByTime = (requestdata, result) => {
    let resJson = {"status": "","data": {},"msg": "","errormsg": ""};
    let validation=validateData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    validation=validateGroupByData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    let spaceId = requestdata.spaceId;
    let from = requestdata.from;
    let to = requestdata.to;
    let groupByFrequency=requestdata.groupBy;

    let query="select count(current_density) from density_limit_violation where space_id='" + spaceId + "' and time >='" + from + "' and time <='" + to + "' GROUP BY time(1"+groupByFrequency+")";

    console.log("Query:"+query)
    
    influx.query(query)
        .catch(err => {
            console.log(err);
            resJson.status = "FAIL";
            resJson.errormsg = err;
            result(null,resJson);
        }).then(results => {

            resJson.status = "SUCCESS";
            resJson.data = results;
            result(null, resJson);
            return;
        });

};



DashboardSpace.getSpaceSocialDistanceViolation = (requestdata, result) => {
    let resJson = {"status": "","data": {},"msg": "","errormsg": ""};
    let validation=validateData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    let spaceId = requestdata.spaceId;
    let from = requestdata.from;
    let to = requestdata.to;
    let query = "select * from social_distance_violation where space_id='" + spaceId+ "' and time >='" + from + "' and time <='" + to + "'";;
    console.log("Query:"+query)
    influx.query(query)
        .catch(err => {
            console.log(err);
            resJson.status = "FAIL";
            resJson.errormsg = err;
            result(null,resJson);
        }).then(results => {
            resJson.status = "SUCCESS";
            resJson.data = results;
            result(null, resJson);
            return;
        });
};

DashboardSpace.getSpaceSocialDistanceViolationCountByTime = (requestdata, result) => {
    let resJson = {"status": "","data": {},"msg": "","errormsg": ""};
    let validation=validateData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    validation=validateGroupByData(requestdata);
    if(validation.length > 0 ){
        resJson.status = "FAIL";
        resJson.errormsg = validation;
        result(null,resJson);
        return;
    }
    let spaceId = requestdata.spaceId;
    let from = requestdata.from;
    let to = requestdata.to;
    let groupByFrequency=requestdata.groupBy;
    let query="select count(person1_id) from social_distance_violation where space_id='" + spaceId + "' and time >='" + from + "' and time <='" + to + "' GROUP BY time(1"+groupByFrequency+")";
    
    // let query = "select * from social_distance_violation where space_id=" + spaceId + " and time >='" + from + "' and time <='" + to + "'";
    console.log("Query:"+query)
    influx.query(query)
        .catch(err => {
            console.log(err);
            resJson.status = "FAIL";
            resJson.errormsg = err;
            result(null,resJson);
        }).then(results => {

            resJson.status = "SUCCESS";
            resJson.data = results;
            result(null, resJson);
            return;
        });

};

module.exports = DashboardSpace;