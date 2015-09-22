function lib(React) {
  var common = require('./lib/common')(React);
  return {
    layout: require('./lib/layout')(React, common)
  };
}

if (global.React) {
  global.rsui = lib(global.React);
} else {
  module.exports = lib;
}
