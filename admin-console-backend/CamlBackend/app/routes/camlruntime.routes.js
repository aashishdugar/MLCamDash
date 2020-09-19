module.exports = app => {
    const camlruntime = require("../controllers/camlruntime.controller.js");
  
    // Start caml runtime
    app.post("/camlruntime/start", camlruntime.start);

    // Stop caml runtime
    app.post("/camlruntime/stop", camlruntime.stop);
};