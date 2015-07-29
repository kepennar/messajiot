var rqr = require('rqr');
var Promise = require('bluebird');
var router = require('express').Router();
var Message = require('mongoose').model('Message');
var globalHM = rqr('app/components/handlers-manager').global;

Promise.promisifyAll(Message);
Promise.promisifyAll(Message.prototype);

router.get('/', function(req, res, next) {
  Message.find()
  .limit(5)
  .sort('-updatedAt')
  .then(function(messages) {
    res.json(messages);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  var message = req.body;
  Message.createAsync({title: req.body.title, text: req.body.message})
  .then(function(message) {
    var event = {
      event: 'messages:created',
      data: message
    };
    globalHM.handle('messages', event);
    res.status(201).send(message);
  })
  .catch(next);
});

router.delete('/', function(req, res, next) {
  Message.remove()
  .then(function(response) {
    var nbMessageDeleted = response.result.n;
    var event = {
      event: 'messages:deleted',
      data: nbMessageDeleted
    };
    globalHM.handle('messages', event);
    res.json({nbItemsDeleted: nbMessageDeleted});
  })
  .catch(next);
});

module.exports = {
  name: 'MessagesAPI',
  contextPath: '/api/messages',
  routes: router

};
