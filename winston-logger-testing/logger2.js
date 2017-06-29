const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});

logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');