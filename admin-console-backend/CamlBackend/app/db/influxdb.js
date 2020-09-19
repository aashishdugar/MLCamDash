const Influx = require('influx');
const influxdbConfig = require("../../config/influxdb.config.js");
const influxConnection= new Influx.InfluxDB({
    host: influxdbConfig.HOST,
    database: influxdbConfig.DB,
    port:influxdbConfig.PORT
});

module.exports = influxConnection;
