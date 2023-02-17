const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.prettyPrint()
        )
      }),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

function handleExceptions() {
  // Handle uncaught exceptions and unhandled promise rejections
  process.on("uncaughtException", (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
}

module.exports = { logger, handleExceptions };
