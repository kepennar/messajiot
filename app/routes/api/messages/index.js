var router = require('express').Router();
var Message = require('mongoose').model('Message');

router.get('/', function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) {
      return next(err)
    };
    res.json(messages);
  });
});
router.post('/', function (req, res, next) {
  Message.create({title: req.body.title, text: req.body.message}, function (err, message) {
    if (err) {
      return next(err)
    };
    res.send(201, message);
  });
});

module.exports = {
  name: 'MessagesAPI',
  contextPath: '/api/messages',
  routes: router

};
