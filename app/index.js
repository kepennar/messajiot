var rqr = require('rqr');

var express = require('express');
var glob = require('glob');
var config = require('config');
var favicon = require('serve-favicon');
var loggerStream = rqr('app/components/logger').stream;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var swig = require('swig');

var routes = rqr('app/routes');

var app = express();

app.engine('swig', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'swig');

var env = process.env.NODE_ENV || 'dev';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'dev';

app.use(favicon('public/img/favicon.ico'));
app.use(morgan('dev', {
  'stream': loggerStream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compress());
app.use(express.static('./public'));
app.use(methodOverride());
app.use(routes)

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'dev') {
  app.use(function (err, req, res, next) {
    if (req.url.indexOf('/api/') >= 0) {
      res.status(500).send({
        message: err.message,
        error: err
      });
    } else {
      next(err);
    }
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res, next) {
  if (req.url.indexOf('/api/') >= 0) {
    res.status(500).send({
      message: err.message
    });
  } else {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

module.exports = app;

