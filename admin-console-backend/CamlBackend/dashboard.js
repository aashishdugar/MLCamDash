/**
 * In this example we'll create a server which has an index page that prints
 * out "hello world", and a page `http://localhost:3000/times` which prints
 * out the last ten response times that InfluxDB gave us.
 *
 * Get started by importing everything we need!
 */
//const Influx = require("../../");
const Influx = require('influx');
const express = require("express");
const http = require("http");
const os = require("os");

const app = express();

const bodyParser = require("body-parser");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// require("./app/routes/influx.routes.js")(app);


/**
 * Create a new Influx client. We tell it to use the
 * `express_response_db` database by default, and give
 * it some information about the schema we're writing.
 */
const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "caml_events",
  schema: [
    {
      measurement: "response_times",
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER,
      },
      tags: ["host"],
    },
  ],
});

/**
 * Next we define our middleware and hook into the response stream. When it
 * ends we'll write how long the response took to Influx!
 */
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.path} took ${duration}ms`);

    influx
      .writePoints([
        {
          measurement: "response_times",
          tags: { host: os.hostname() },
          fields: { duration, path: req.path },
        },
      ])
      .catch((err) => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`);
      });
  });
  return next();
});

app.get("/", function (req, res) {
  setTimeout(() => res.end("Hello world!"), Math.random() * 500);
});

app.get("/getsocialdistanceviolation", function (req, res) {
  influx
    .query(
      `
      select * from social_distance_violation
  `
    )
    .then((result) => {
      console.log("output",JSON.stringify(result));
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.stack);
    });
});

/**
 * Now, we'll make sure the database exists and boot the app.
 */
influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes("caml_events")) {
      return influx.createDatabase("caml_events");
    }
  })
  .then(() => {
    http.createServer(app).listen(3000, function () {
      console.log("Listening on port 3000.");
    });
  })
  .catch((err) => {
    console.error(`Error creating Influx database!`);
  });
