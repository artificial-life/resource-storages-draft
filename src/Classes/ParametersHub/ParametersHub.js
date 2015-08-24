'use strict'

var _ = require('lodash');
var BasicHub = require('./BasicHub.js');
var CompositeHub = require('./CompositeHub.js');

class ParametersHub {
    static create(type, description) {
        return type === 'composite' ? new CompositeHub(description) : new BasicHub(description);
    }

}

module.exports = ParametersHub;