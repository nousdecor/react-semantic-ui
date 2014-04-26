var React = require('react'),
    mixins = require('mixins')
    cache = {
      id: 0
    };

module.exports = {
  uniqueId: function() {
    return 'rsui-' + cache.id++;
  },

  defaults: function() {
    var base = arguments[0],
        current;
    for (var i=1; i<arguments.length; i++) {
      current = arguments[i];
      for (var name in current) {
        if (base[name] === undefined) {
          base[name] = current[name];
        }
      }
    }
    return base;
  },

  omit: function(data, keys) {
    var rtn = {};
    for (var name in data) {
      if (keys.indexOf(name) === -1) {
        rtn[name] = data[name];
      }
    }
    return rtn;
  },

  mergeClassNames: function() {
    var rtn = '';
    for (var i=0; i<arguments.length; i++) {
      if (arguments[i]) {
        if (rtn.length > 0) rtn += ' ';
        rtn += arguments[i];
      }
    }
    return rtn;
  },

  eventBinder: function(value, type, context, cancelEvent) {
    return function(event) {
      if (cancelEvent) {
        event.stopPropagation();
        event.preventDefault();
      }
      context[type] && context[type](value, event);
      context.props[type] && context.props[type](value, event);
    };
  },

  result: function(value, context) {
    if (typeof value === 'function') {
      return value.call(context);
    } else {
      return value;
    }
  },

  init: function(_module, classData, options) {
    options = options || {};
    var exports = _module.exports,
        _mixins = exports.mixins;
    if (!exports.mixins) {
      _mixins = exports.mixins || {};
    }

    function _init() {
      for (var name in classData) {
        var data = classData[name];
        if (options.defaults) {
          for (var fName in options.defaults) {
            if (!data[fName]) {
              data[fName] = options.defaults[fName];
            }
          }
        }
        data.mixins = mixins.get(data.mixins, _mixins[name], _mixins.all);
        exports[name] = React.createClass(data);
      }
    }

    exports.reset = _init;
    exports.classData = classData;
    _init();
  }
};