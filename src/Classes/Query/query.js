'use strict'

var _ = require('lodash');
var Range = require('./Range.js');

class Query {
    constructor(params_hub, default_params = {}) {
        this.hub = params_hub;
        this.defaults = default_params;
        this.reset();
    }
    reset() {
        this.has_discrete_part = false;
        this.filters = _.clone(this.defaults, true);
        return this;
    }
    getContinuosParams() {
        var continuos_names = this.hub.getNames('continuos');

        return _.transform(this.filters, (result, value, key) => {
            if (continuos_names.indexOf(key) !== -1) result[key] = value;
        });
    }
    addParams(params) {
        _.forEach(params, (param, key) => {
            this.addParam(key, param);
        });

        return this;
    }
    addParam(key, value) {
        var description = this.hub.getParamByName(key);

        if (description) {
            this.filters[key] = description.isDiscrete() ? new Range(value) : value;
            this.has_discrete_part = description.isDiscrete() || this.has_discrete_part;
        }

        return this;
    }
    inRange(key) {
        if (!this.has_discrete_part) return true;

        var result = true;

        _.forEach(key, (part) => {
            var value = part.toString();
            var name = part.getName();
            if (this.filters.hasOwnProperty(name)) {
                if (!this.filters[name].inRange(value)) result = false;
            }
        });

        return result;
    }
    filter(layers, callback) {
        var continuos_query = this.getContinuosParams();
        _.forEach(layers, (layer) => {
            if (this.inRange(layer.getKey())) {
                callback(layer, continuos_query);
            }
        });
        return this;
    }
}

module.exports = Query;