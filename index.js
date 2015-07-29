var rqr = require('rqr');

var express = require('express');
var config = require('config');
var glob = require('glob');
var mongoose = require('mongoose');
var logger = rqr('app/components/logger').logger;
var realtime = rqr('app/components/realtime');
var messagesList = rqr('app/components/messages-queue');

mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db.url);
});

var models = glob.sync('./app/models/*.js');
models.forEach(function(model) {
  require(model);
});
var app = rqr('app');

var server = app.listen(config.app.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  logger.debug('App listening at http://%s:%s', host, port);

});
// Initialize realtime component
realtime(server);
