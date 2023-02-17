const config = require('config');

module.exports = function () {
  //we need to export the env var on terminal using: export vidly_jwtPrivateKey=<ourSecretKey>
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
