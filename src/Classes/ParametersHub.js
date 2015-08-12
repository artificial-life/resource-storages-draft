'use strict'

var _ = require('lodash');

var stored_types = {};

var discover = function (name) {
    if (stored_types.hasOwnProperty(name)) return stored_types[name];

    var param_name = _.capitalize(_.camelCase(name));
    stored_types[name] = require('./Parameters/' + param_name + 'Parameter.js');
    return stored_types[name];
}

class Parameters {
    constructor(description) {
        this.params = {};
        this.params.discrete = [];
        this.params.continuos = [];
        this.by_name = {};

        _.forEach(description, (param_desc) => {
            var model = discover(param_desc.type);
            var default_values = param_desc.default_values;
            var global_name = param_desc.name;

            var param = new model(global_name, default_values);

            this.addParam(param)
        });
    }
    addParam(param) {
        var list = param.isDiscrete() ? 'discrete' : 'continuos';

        this.by_name[param.getName()] = {
            list: list,
            id: this.params[list].length
        };

        this.params[list].push(param)
    }
    addParams(params) {
        _.forEach(params, (param) => {
            this.addParam(param);
        });
    }
    hasParam(name) {
        return this.by_name.hasOwnProperty(name);
    }
    getParamByName(name) {
        if (this.hasParam(name)) {
            var list = this.by_name[name].list;
            var id = this.by_name[name].id;
            return this.params[list][id];
        }
        return false;
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