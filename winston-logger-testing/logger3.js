const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console with timestamp
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});

logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');