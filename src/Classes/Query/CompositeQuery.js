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
        //@TODO: this should be reworked in future if we would have multiple basic volumes in layers
        var names = [];
        _.forEach(ingredients, (ingredient) => {
            names = _.union(names, ingredient.getParams().getNames('continuos'));
        });
        var formula_name = names[0];
        /*=====================*/

        var formula = this.hub.getFormula()[formula_name];

        this.buildFilter(0, {}, (path) => {
            var discrete_params = this.hub.project(path);
            var filters = _.merge(continuos_filters, discrete_params);

            var layers = _.map(ingredients, (ingredient, name) => {
                var extracted = ingredient.observe(filters[name]);
                var first_key = _.first(_.keys(extracted.getContent()));

                return extracted.getLayerVolume(first_key);
            });

            var composite_volume = formula(layers);

            if (composite_volume) callback(path, composite_volume)
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
                callback(path);
            }
        }
    }

}

module.exports = CompositeQuery;