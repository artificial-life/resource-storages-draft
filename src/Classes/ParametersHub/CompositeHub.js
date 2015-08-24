'use strict'

var _ = require('lodash');

var BasicHub = require('./BasicHub.js');

class CompositeHub extends BasicHub {
    constructor(description) {
        super(description);
        this.composite = true;
    }
    extractProjection(description) {
        _.forEach(description, (param) => {
            if (param.projection) this.setProjection(param.name, param.projection)
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
    setProjection(name, projection) {
        this.projection = this.projection || {};

        if (!this.hasParam(name)) throw new Error('Missing param ' + name);

        this.projection[name] = projection;
        return this;
    }
    setFormula(name, formula) {
        this.formula = this.formula || {};
        if (!this.hasParam(name)) throw new Error('Missing param ' + name);

        this.formula[name] = formula;
        return this;
    }
    setContinuosDecorators(decorator) {
        var param_name = this.Continuos()[0].getName();
        var projection = decorator.projection;
        var formula = decorator.formula;

        this.setProjection(param_name, projection);
        this.setFormula(param_name, formula);
    }
    getFormula() {
        return this.formula;
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