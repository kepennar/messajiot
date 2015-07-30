var rqr = require('rqr');

var express = require('express');
var loggerStream = rqr('app/components/logger').stream;
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var routes = rqr('app/routes');

var app = express();

var env = process.env.NODE_ENV || 'dev';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'dev';

app.use(cors);
app.use(morgan('dev', {
  'stream': loggerStream
}));

app.use(bodyParser.json());
app.use(compress());
app.use(methodOverride());
app.use(routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    if (req.url.indexOf('/api/') >= 0) {
      res.status(500).send({
        message: err.message,
        error: err
      });
    } else {
      next(err);
    }
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function(err, req, res, next) {
  if (req.url.indexOf('/api/') >= 0) {
    res.status(500).send({
      message: err.message
    });
  } else {
    next(err);
  }
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

module.exports = app;

