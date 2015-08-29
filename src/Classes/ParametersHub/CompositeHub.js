'use strict'

var _ = require('lodash');

var BasicHub = require('./BasicHub.js');
var Generator = require('./Parameters/Generator/Generator.js');

class CompositeHub extends BasicHub {
    constructor(description) {
        super(description);
        this.composite = true;
    }
    addParamsGenerator(description) {
        _.forEach(description, (param) => {
            if (param.generator) this.addGenerator(param.name, param.generator)
        });
    }
    addParamsDescription(descriptions) {
        super.addParamsDescription(descriptions);
        this.addParamsGenerator(descriptions);

        return this;
    }
    addGenerator(name, generator_data) {
        this.generators = this.generators || {};
        var type = generator_data.type;
        var action = generator_data.action;

        this.generators[name] = Generator.create(type, action);

        this.generators[name].setParamName(name);
    }
    project(params) {
        var result = {};

        _.forEach(params, (param, key) => {
            if (!this.generators.hasOwnProperty(key)) throw new Error('Can not project this');

            var action = this.generators[key].getAction();
            var projected = action(params);

            _.forEach(projected, (projection, ingredient) => {
                result[ingredient] = result[ingredient] || {};

                result[ingredient][key] = projection;
            })
        });

        return result;
    }
    setFormula(name, formula) {
        this.formula = this.formula || {};
        if (!this.hasParam(name)) throw new Error('Missing param ' + name);

        this.formula[name] = formula;
        return this;
    }
    setContinuosDecorators(decorators) {
        var names = this.getNames('continuos');

        _.forEach(decorators, (decorator, index) => {
            var param_name = names[index];
            var generator_data = decorator.generator;
            var formula = decorator.formula;

            this.addGenerator(param_name, generator_data);
            this.setFormula(param_name, formula);
        });
    }
    getFormula() {
        return this.formula;
    }
    getDescription(list) {
        if (list == 'discrete') {
            return _.map(this.Discrete(), (param) => this.getParamDescription(param));
        } else
        if (list == 'continuos') {
            return _.map(this.Continuos(), (param) => this.getParamDescription(param));
        } else {
            return _.map(this.All(), (param) => this.getParamDescription(param));
        }
    }
    getParamDescription(param) {
        var result = param.getDescription();
        result.generator = this.generators[result.name].getDescription();

        return result;
    }
}


module.exports = CompositeHub;