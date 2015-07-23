var rqr = require('rqr');
var SSE = require('sse');
var HandlersManager = rqr('app/components/handlers-manager');
var logger = rqr('app/components/logger').logger;

module.exports = function(app) {
  var sse = new SSE(app);
  sse.on('connection', function(sseClient) {
    logger.debug('[SSE] Client connected');
    HandlersManager.global.addHandlers('message:created', function(message) {
      sseClient.send('Created: ' + JSON.stringify(message));
    });
  });
};
