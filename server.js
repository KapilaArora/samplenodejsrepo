// Server.js
const path = require("path");
const log = require("npmlog");
const express = require("express");
const bodyParser = require("body-parser");
//const auth = require("./auth.js")();
const config = require("./config.js");

var cfenv = require("cfenv");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(auth.initialize());
const routes = require('./api/routes/route.js');
routes(app);
log.level = config.logLevel;

// get the app environment from Cloud Foundry

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
  log.info(path.basename(module.filename), "Application started @" + appEnv.url);
});
