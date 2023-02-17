const logger = require('../startup/logger');

module.exports = function (err, req, res, next) {
    //error - warn - info - verbose - debug - silly
    logger.error(err.message);
    res.status(500).send('Something went wrong.');
}