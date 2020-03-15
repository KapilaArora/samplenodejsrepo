// Server.js
const path = require("path");
const log = require("npmlog");
const express = require("express");
const bodyParser = require("body-parser");
//const auth = require("./auth.js")();
const config = require("./config.js");
//var cfenv = require("cfenv");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(auth.initialize());
const routes = require('./api/routes/route.js');
routes(app);
log.level = config.logLevel;
// get the app environment from Cloud Foundry

//var appEnv = cfenv.getAppEnv();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
// start server on the specified port and binding host
app.listen(server_port, server_ip_address, function() {
 console.log( "Listening on " + server_ip_address + ", port " + server_port )
  log.info(path.basename(module.filename), "Application Listening @" +  server_ip_address + ", port " + server_port);
});
