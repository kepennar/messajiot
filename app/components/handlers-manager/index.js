var _ = require('lodash');

function HandlersManager(name) {

  function getAndSetIfNot(key, container) {
    var node = container[key];
    if (!node) {
      node = {};
      container[key] = node;
    }
    var retrievedHandlers = node.handlers;
    if (!retrievedHandlers) {
      retrievedHandlers = [];
      container[key].handlers = retrievedHandlers;
    }
    return node;
  }

  function getNode(topicKey, container) {
    var keys = topicKey.split(':');
    var node = container;
    keys.forEach(function(key) {
      node = getAndSetIfNot(key, node);
    });
    return node;
  }

  function flattenHandlers(container) {
    var actualHandlers = container.handlers;
    _.forIn(container, function(value, key) {
      if (_.isPlainObject(value)) {
        actualHandlers = _.union(actualHandlers, flattenHandlers(value));
      }
    });
    return actualHandlers;
  }

  return {
    name: name ? name : 'noName',
    handlers: {},

    handle: function(topicKey, data) {
      this.getHandlers(topicKey).forEach(function(handler) {
        handler(data);
      });
    },
    getHandlers: function(topicKey) {
      return getNode(topicKey, this.handlers).handlers;
    },
    getHandlersDeep: function(topicKey) {
      var node = getNode(topicKey, this.handlers);
      return flattenHandlers(node);
    },
    addHandlers: function(topicKey, newHandlers) {
      var actualHandlers = this.getHandlers(topicKey);
      if (newHandlers instanceof Array) {
        actualHandlers = _.union(actualHandlers, newHandlers);
      } else {
        actualHandlers.push(newHandlers);
      }
      getNode(topicKey, this.handlers).handlers = actualHandlers;
    }
  };
}

var globalHandlersManager = new HandlersManager('global');
module.exports = {
  create: function(name) {
    return new HandlersManager(name);
  },
  global: globalHandlersManager
};
