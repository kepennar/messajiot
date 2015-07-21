var router = require('express').Router();
var Message = require('mongoose').model('Message');

router.get('/', function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) {
      return next(err)
    };
    res.render('index', {
      title: 'A message',
      messages: messages
    });
  });
});
module.exports = {
  name: 'Home',
  contextPath: '/',
  routes: router

};
