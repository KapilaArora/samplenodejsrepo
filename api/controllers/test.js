const path = require("path");
const log = require("npmlog");
const async = require("async");
const request = require("request");
const cloudant = require("cloudant");
const dateFormat = require("date-and-time");
const config = require("../../config.js");
var dateTime = require('node-datetime');



exports.test = function (req, res) {
    log.info(path.basename(module.filename), "Inside REST API Demo Test Endpoint ");
    res.status(200).send({ statusMessage: "Nodejs DemoTest REST Api is started and running " });
};
