// userAuthenticationCtrl.js
const path = require("path");
const log = require("npmlog");
const jwt = require("jwt-simple");
const request = require("request");
const cloudant = require("cloudant");
const config = require("../../config.js");


exports.login = function (req, res) {
    log.info(path.basename(module.filename), "User authentication controller :: login()");
    if (req.body.username && req.body.password) {
        getUser(req.body.username, req.body.password ,function (user) {
            if (user) {
                console.log(user);
                var payload = { username: req.body.username,staffType:user.staffType,staffID:user.staffID };
                var token = jwt.encode(payload, config.jwtSecret);
                
                
                var loginContext = {
                    token: token,
                    username: user.username,
                    emailid:user.emailid,
                    staffType: user.staffType,
                    staffID: user.staffID,
                    login: "success"
                };
                res.status(200).send({ loginContext });
            } else {
                var loginContext = {
                    login: "fail"
                };
                res.status(401).send({ loginContext, statusMessage: "Username and/or Password does not match." });
            }
        });
    } else {
        res.status(401).send({ statusMessage: "Username and/or Password does not match." });
    }
};

exports.generateToken = function (req, res) {
    log.info(path.basename(module.filename), "User authentication controller :: generateToken()");
    if (req.body.username && req.body.password) {
        getToken(req.body.username, req.body.password, function (token) {
            if (token) {
                res.status(200).send({ token: token });
            } else {
                res.status(401).send({ statusMessage: "Username and/or Password does not match." });
            }
        });
    } else {
        res.status(401).send({ statusMessage: "Username and/or Password does not match." });
    }
};

function getToken(username, password, callback) {
    log.info(path.basename(module.filename), "User authentication controller :: getToken()");
    getUser(username, password, function (user) {
        if (user) {
            var payload = { username: username };
            var token = jwt.encode(payload, config.jwtSecret);
            return callback(token);
        }
        return callback(null);
    });
}

function getUser(username, password, callback) {
    log.info(path.basename(module.filename), "User authentication controller :: getUser()");
    var cloudantConn = cloudant({ url: config.cloudantServer.url });
    var database = cloudantConn.db.use(config.cloudantServer.database);
    database.find({ selector: { username: username, password: password } }, function (err, result) {
        if (err) {
            log.error(path.basename(module.filename), "An error occured while performing database operation");
            return callback(null);
        }

        if (result && result.docs && result.docs.length >= 1) {
            log.info(path.basename(module.filename), "User found :: " + result.docs[0].username + "[" + result.docs[0].staffType + "]"+ "[" + result.docs[0].staffID + "]");
            return callback(result.docs[0]);
        }

        log.error(path.basename(module.filename), "Unable to find user :: " + username);
        return callback(null);
    });
}
