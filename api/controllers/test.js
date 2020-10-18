const path = require("path");
const log = require("npmlog");
const async = require("async");
const config = require("../../config.js");
const querystring = require('querystring');



exports.test = function (req, res) {
    log.info(path.basename(module.filename), "Inside REST API Demo Test Endpoint "); 
    if( req.query.id){

        res.status(200).send({ id: req.query.id,firstName: "Fname" , lastName: "lname" , statusMessage: "Nodejs DemoTest REST Api is started and running " });

    } else {

        res.status(500).send({ errorMessage: "Error will API call" });
    }
   
};
