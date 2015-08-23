'use strict'

var _ = require('lodash');

var stored_types = {};

var discover = function (name) {
    if (stored_types.hasOwnProperty(name)) return stored_types[name];

    var param_name = _.capitalize(_.camelCase(name));
    stored_types[name] = require('./Parameters/' + param_name + 'Parameter.js');
    return stored_types[name];
}

class BasicHub {
    constructor(description) {
        this.params = {};
        this.params.discrete = [];
        this.params.continuos = [];
        this.by_name = {};

        this.addParamsDescription(description);
    }
    static makeParam(description) {
        var model = discover(description.type);
        var default_values = description.default_values;
        var global_name = description.name;

        var param = new model(global_name, default_values);

        return param;
    }
    addParam(param) {
        var list = param.isDiscrete() ? 'discrete' : 'continuos';

        this.by_name[param.getName()] = {
            list: list,
            list_id: this.params[list].length
        };

        this.params[list].push(param)
    }
    addParams(params) {
        _.forEach(params, (param) => {
            this.addParam(param);
        });
    }
    addParamsDescription(descriptions) {
        _.forEach(descriptions, (description) => {
            var param = BasicHub.makeParam(description);
            this.addParam(param);
        });

        return this;
    }
    hasParam(name) {
        return this.by_name.hasOwnProperty(name);
    }
    getParamByName(name) {
        if (this.hasParam(name)) {
            var list = this.by_name[name].list;
            var id = this.by_name[name].list_id;
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
    getDescription() {
        return _.map(this.All(), (param) => param.getDescription());
    }
    makeKey(data_array) {
        if (_.isArray(data_array))
            return _.map(this.Discrete(), (param, index) => param.makeKey(data_array[index]));

        if (_.isObject(data_array))
            return _.map(this.Discrete(), (param) => param.makeKey(data_array[param.getName()]));
    }
    keyObjectToArray(obj) {
        var result = [];
        for (var name in obj) {
            if (this.hasParam(name)) {
                var id = this.by_name[name].list_id;
                result[id] = obj[name];
            }
        }
        return result;
    }
    getNames(list) {
        switch (list.toLowerCase()) {
        case 'continuos':
            return _.map(this.Continuos(), (param) => param.getName());
        case 'discrete':
            return _.map(this.Discrete(), (param) => param.getName());
        default:
            return _.map(this.All(), (param) => param.getName());
        }
    }
}


module.exports = BasicHub;