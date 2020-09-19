const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To CAML Application." });
});

// set port, listen for requests
require("./app/routes/user.routes.js")(app);
require("./app/routes/country.routes.js")(app);
require("./app/routes/state.routes.js")(app);
require("./app/routes/camerastatus.routes.js")(app);
require("./app/routes/eventtype.routes.js")(app);
require("./app/routes/eventstatus.routes.js")(app);
require("./app/routes/widgettype.routes.js")(app);
require("./app/routes/graphtype.routes.js")(app);
require("./app/routes/staticdata.routes.js")(app);
require("./app/routes/spacetype.routes.js")(app);
require("./app/routes/space.routes.js")(app);
require("./app/routes/device.routes.js")(app);
require("./app/routes/camera.routes.js")(app);
require("./app/routes/dataobject.routes.js")(app);
require("./app/routes/rule.routes.js")(app);
require("./app/routes/cameraregion.routes.js")(app);
require("./app/routes/dashb.space.routes.js")(app);

require("./app/routes/camlruntime.routes.js")(app);




app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
