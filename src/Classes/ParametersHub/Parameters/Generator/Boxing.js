'use strict'

var uuid = require('node-uuid');

var BasicGenerator = require('./BasicGenerator.js');

class Boxing extends BasicGenerator {
    getAction() {
        var projection = (context) => {
            return uuid.v1();
        }
        return projection;
    }
}

module.exports = Boxing;