// config.js
module.exports = {
  logLevel: "info",
  jwtSecret: "Hj7290Odrpl86",
  jwtSession: { session: false },
  composerRestServer: { url: "http://varys-crs-org1.eu-gb.mybluemix.net/api" },
  cloudantServer: {
    url:
      "https://e9dd5b0c-8758-4588-af4b-e459f30d0c8c-bluemix:efbe19fd7383395df50e063e0a9ce561549656d5d32a58de91dce65395cb2d1c@e9dd5b0c-8758-4588-af4b-e459f30d0c8c-bluemix.cloudant.com",
    database: "mydatabase"
  }
};
