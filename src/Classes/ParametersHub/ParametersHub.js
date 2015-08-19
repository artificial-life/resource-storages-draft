'use strict'

var _ = require('lodash');
var BasicHub = require('./BasicHub.js');
var CompositeHub = require('./CompositeHub.js');

class ParametersHub {
    static create(data) {
        var is_composite = false;
        var description = data;

        if (data.hasOwnProperty('composite')) {
            description = data.description;
            is_composite = data.composite;
        }

        return is_composite ? new CompositeHub(description) : new BasicHub(description);
    }

}

module.exports = ParametersHub;