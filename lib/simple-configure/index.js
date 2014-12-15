'use strict';

var _ = require('lodash');
/*jslint stupid: true */
var exists = require('fs').existsSync;
/*jslint stupid: false */

var storage = {};

module.exports = {
  addFiles: function (files) {
    var self = this;
    _.each(files, function (file) {
      if (exists(file)) {
        self.addProperties(require(file));
      }
    });
  },

  addProperties: function (properties) {
    if (!properties) { return; }
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