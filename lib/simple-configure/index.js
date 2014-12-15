'use strict';

var _ = require('lodash');
var fs = require('fs');

var storage = {};

module.exports = {
  addFiles: function (files) {
    var self = this;
    _.each(files, function (file) {
      if(fs.existsSync(file)) {
        self.addProperties(require(file));
      }
    });
  },

  addProperties: function (properties) {
    if(!properties) { return; }
    _.each(Object.keys(properties), function (property) {
      storage[property] = properties[property];
    });
  },

  get: function (property) {
    return storage[property];
  },

  reset: function () {
    storage = {};
  }

};