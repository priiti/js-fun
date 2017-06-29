// Logging levels
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const winston = require('winston');

winston.level = 'debug';

winston.info('Hello');
winston.debug('Debugging info');