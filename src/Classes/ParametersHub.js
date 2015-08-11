'use strict'

var _ = require('lodash');

var stored_types = {};
var discover = function (name) {
    if (stored_types.hasOwnProperty(name)) return stored_types[name];

    stored_types[name] = require('./Parameters/' + name + 'Parameter.js');
    return stored_types[name];
}

class Parameters {
    constructor(description) {
        this.params = {};
        this.params.discrete = [];
        this.params.continuos = [];

        _.foEach(description, (param_desc) => {
            var model = discover(param_desc.type);
            var default_values = param_desc.default_values;
            var global_name = param_desc.name;

            var param = new model({
                name: global_name,
                default_values: default_values
            });

            if (param.isDiscrete()) {
                this.params.discrete.push(param)
            } else {
                this.params.continuos.push(param);
            }
        });
    }
    addParams(params) {
        _.forEach(params, (param) => {
            if (param.isDiscrete()) {
                this.params.discrete.push(param)
            } else {
                this.params.continuos.push(param);
            }
        });
    }
    Discrete() {
        return this.params.discrete;
    }
    Continuos() {
        return this.params.continuos;
    }
    All() {
        return _.union(this.params.discrete, this.params.continuos);
    }
    getDesription() {
        return _.map(this.All(), (param) => param.getDesription());
    }
    makeKey(data_array) {
        return _.map(this.Discrete(), (param, index) => param.makeKey(data_array[index]));
    }
}


module.exports = Parameters;