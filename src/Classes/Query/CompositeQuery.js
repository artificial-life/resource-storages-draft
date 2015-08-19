'use strict'

var _ = require('lodash');

var LayerQuery = require('./LayerQuery.js');

class CompositeQuery extends LayerQuery {
    constructor(params_hub) {
        super(params_hub);
    }
    filter(ingredients, callback) {
        this.param_names = _.keys(this.filters);
        var continuos_filters = this.hub.project(this.continuos_filters);
        this.buildFilter(0, {}, (discrete_params) => {

            var filters = _.merge(continuos_filters, discrete_params);
            //console.log(filters);
            var result = _.map(ingredients, (ingredient, name) => ingredient.observe(filters[name]).getContent());
            callback(result);
        });
    }
    buildFilter(depth, path, callback) {
        var name = this.param_names[depth];
        var key = this.filters[name];
        for (var value of key) {
            path[name] = value;

            if (depth + 1 < this.param_names.length) {
                this.buildFilter(depth + 1, path, callback);
            } else {
                callback(this.hub.project(path));
            }
        }
    }

}

module.exports = CompositeQuery;