const mongoose = require("mongoose");
const { logger } = require('./logger');

module.exports = function () {
  const uri =
    "mongodb+srv://kali:kai@cluster0.u2xijug.mongodb.net/Vidly?retryWrites=true&w=majority";
  mongoose
    .connect(uri)
    .then(() => logger.info("Connected to mongodb."));
};

