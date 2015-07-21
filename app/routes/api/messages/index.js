var Promise = require('bluebird');
var router = require('express').Router();
var Message = require('mongoose').model('Message');

Promise.promisifyAll(Message);
Promise.promisifyAll(Message.prototype);

router.get('/', function (req, res, next) {
  Message.find()
  .then(function(messages) {
    res.json(messages);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Message.createAsync({title: req.body.title, text: req.body.message})
  .then(function (message) {
    res.send(201, message);
  })
  .catch(next);
});

module.exports = {
  name: 'MessagesAPI',
  contextPath: '/api/messages',
  routes: router

};
