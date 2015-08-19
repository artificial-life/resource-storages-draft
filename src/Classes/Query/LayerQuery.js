'use strict'

var _ = require('lodash');
var Range = require('./Range.js');
var BasicQuery = require('./BasicQuery.js');

class LayerQuery extends BasicQuery {
    constructor(params_hub) {
        super(params_hub, 'discrete');
        this.continuos_filters = {};
    }
    reset() {
        this.continuos_filters = {};
        return super.reset();
    }
    addParam(key, value) {
        var description = this.hub.getParamByName(key);

        if (!description) return this;

        if (description.isDiscrete()) {
            this.filters[key] = new Range(value);
        } else {
            this.continuos_filters[key] = value;
        }

        return this;
    }
    inRange(key) {
        if (_.isEmpty(this.filters)) return true;

        var result = true;

        _.forEach(key, (part) => {
            var name = part.getName();
            if (this.filters.hasOwnProperty(name)) {
                var value = part.toString();
                if (!this.filters[name].inRange(value)) result = false;
            }
        });

        return result;
    }
    filter(layers, callback) {

        _.forEach(layers, (layer) => {
            if (this.inRange(layer.getKey())) {
                var observed = layer.observe(this.continuos_filters);
                callback(observed);
            }
        });
        return this;
    }
}

module.exports = LayerQuery;