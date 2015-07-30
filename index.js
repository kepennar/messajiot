var rqr = require('rqr');

var express = require('express');
var config = require('config');
var glob = require('glob');
var mongoose = require('mongoose');
var logger = rqr('app/components/logger').logger;
var realtime = rqr('app/components/realtime');
var messagesList = rqr('app/components/messages-queue');

/* *** MongoDB connection *** */
var mongoUri = process.env.MONGOLAB_URI || config.db.url;
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db.url);
});

var models = glob.sync('./app/models/*.js');
models.forEach(function(model) {
  require(model);
});
var app = rqr('app');

var port = process.env.PORT || config.app.port;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  logger.debug('App listening at http://%s:%s', host, port);

});
// Initialize realtime component
realtime(server);
