// Route.js
const path = require("path");
const log = require("npmlog");
const multer = require("multer");
const helmet = require("helmet");
const mkdirp = require("mkdirp");
const dateFormat = require("date-and-time");


module.exports = (app,auth) => {
  
  let test = require("../controllers/test.js");
  let router = require("express").Router();
  
  app.use(
    helmet({
      noCache: true,
      frameguard: true
    })
  );

  // TO SUPPORT CORS
  app.use(setupCors);
  app.use("/api",router.get("/demo-test", test.test));
  //:eventId/:staffId/:staffClearanceId
  // app.use(
  //   "/api/v1",
  //   router.get("/status", auth.authenticate(),(req, res, next) => {
  //     res.status(200);
  //     res.send("App is healthy");
  //   })
  // );
  



  /* Get the User Info
	var userDetails = require("../controllers/UserInfo.js");
	app.route("/api/GetUserDetails").post(auth.authenticate(), userDetails.GetUserDetails);


	// Fetch all the Events
	var GetEvent = require("../controllers/FetchEvent");
	app.route("/api/getAllEvents").get(auth.authenticate(), GetEvent .getAllEvent);


	// Generate RFV ID
	var createrfv = require("../controllers/CreateRFV.js");
	app.route("/api/createRFV").get(auth.authenticate(), createrfv.getcreateRFV);*/
};

let setupCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept,Authorization,Content-Length"
  );
  return next();
};
