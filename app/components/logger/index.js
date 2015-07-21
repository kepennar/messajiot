'use strict';
var winston = require('winston');

winston.emitErrs = true;

var logger = new winston.Logger({
  levels: {
    trace: 0,
    input: 1,
    verbose: 2,
    prompt: 3,
    debug: 4,
    info: 5,
    data: 6,
    help: 7,
    warn: 8,
    error: 9
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  },
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      colorize: true
    })
  ],
  exitOnError: false
});

var profilingLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info'
    })
  ],
  exitOnError: false
});

var winstonStream = {
  write: function(message) {
    logger.info(message.slice(0, -1));
  }
};
module.exports = {
  logger: logger,
  profiling: profilingLogger,
  loggerStream: winstonStream
};
