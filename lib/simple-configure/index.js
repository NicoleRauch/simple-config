'use strict';

/*jslint stupid: true */
var exists = require('fs').existsSync;
/*jslint stupid: false */

var storage = {};

module.exports = {
  addFiles: function (files) {
    if (!files) { return; }
    var self = this;
    files.forEach(function (file) {
      if (exists(file)) {
        self.addProperties(require(file));
      }
    });
  },

  addProperties: function (properties) {
    if (!properties) { return; }
    Object.keys(properties).forEach(function (property) {
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
