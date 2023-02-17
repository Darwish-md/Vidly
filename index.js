const express = require("express");
const { handleExceptions, logger } = require('./startup/logger');
const app = express();

handleExceptions();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));