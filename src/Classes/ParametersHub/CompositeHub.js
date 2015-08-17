'use strict'

var _ = require('lodash');

var BasicHub = require('./BasicHub.js');

class CompositeHub extends BasicHub {
    constructor(description) {
        super(description);
        this.composite = true;
        this.extractProjection(description);
    }
    extractProjection(description) {
        this.projection = {};
        _.forEach(description, (param, name) => {
            this.projection[param.name] = param.projection;
        });
    }
    project(params) {
        var result = {};
        _.forEach(params, (param, key) => {
            if (!this.projection.hasOwnProperty(key)) throw new Error('Can not project this');

            var fn = this.projection[key];
            _.forEach(fn(param), (projection, ingredient) => {
                if (!result[ingredient]) result[ingredient] = {};
                result[ingredient][key] = projection;
            })

        });
        return result;
    }
}


module.exports = CompositeHub;