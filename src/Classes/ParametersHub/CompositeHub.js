'use strict'

var _ = require('lodash');

var BasicHub = require('./BasicHub.js');

class CompositeHub extends BasicHub {
    constructor(description) {
        super(description);
        this.composite = true;
    }
    extractProjection(description) {
        this.projection = this.projection || {};

        _.forEach(description, (param, name) => {
            this.projection[param.name] = param.projection;
        });
    }
    addParamsDescription(descriptions) {
        super.addParamsDescription(descriptions);
        this.extractProjection(descriptions);

        return this;
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
    setProjection(projection_data) {
        var name = projection_data.name;
        var projection = projection_data.projection;

        this.projection = this.projection || {};
        if (this.projection.hasOwnProperty(name)) this.projection[name] = projection;
        return this;
    }
    getDescription(list) {
        if (list == 'discrete') {
            return _.map(this.Discrete(), (param) => {

                var result = param.getDescription();
                result.projection = this.projection[result.name];

                return result;
            });
        } else
        if (list == 'continuos') {
            return _.map(this.Continuos(), (param) => {

                var result = param.getDescription();
                result.projection = this.projection[result.name];

                return result;
            });
        } else {
            return _.map(this.All(), (param) => {

                var result = param.getDescription();
                result.projection = this.projection[result.name];

                return result;
            });
        }
    }
}


module.exports = CompositeHub;