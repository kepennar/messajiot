var Promise = require('bluebird');

var router = require('express').Router();
var Message = require('mongoose').model('Message');

Promise.promisifyAll(Message);
Promise.promisifyAll(Message.prototype);

router.get('/', function (req, res, next) {
  Message.find()
  .then(function(messages) {
    res.render('index', {
      title: 'Message',
      messages: messages
    });
  })
  .catch(next);
});

module.exports = {
  name: 'Home',
  contextPath: '/',
  routes: router

};
