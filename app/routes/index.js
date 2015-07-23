'use strict';

var rqr = require('rqr');
var glob = require('glob');
var router = require('express').Router();
var colors = require('colors');
var logger = rqr('app/components/logger').logger;

var controllers = [];
controllers.push('app/routes/api/messages');

controllers.forEach(function (controllerPath) {
  var controller = rqr(controllerPath);
  router.use(controller.contextPath, controller.routes);
  logger.debug('Exposing %s routes on "%s" context', controller.name, controller.contextPath);
});
module.exports = router;
