var rqr = require('rqr');
var SSE = require('sse');
var HandlersManager = rqr('app/components/handlers-manager');
var logger = rqr('app/components/logger').logger;

module.exports = function(app) {
  var sse = new SSE(app);
  sse.on('connection', function(sseClient) {
    HandlersManager.global.addHandlers('messages', function(event) {
      sseClient.send(JSON.stringify(event));
    });
  });
};
