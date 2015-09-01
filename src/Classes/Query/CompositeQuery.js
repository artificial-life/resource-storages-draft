'use strict'

var _ = require('lodash');

var LayerQuery = require('./LayerQuery.js');
var Range = require('./Layer/Range.js');

class CompositeQuery extends LayerQuery {
    getFormula(ingredients) {
        //@TODO: this should be reworked in future if we would have multiple basic volumes in layers
        //@TODO: also this is ugly
        var names = [];
        _.forEach(ingredients, (ingredient) => {
            names = _.union(names, ingredient.getParams().getNames('continuos'));
        });
        var formula_name = names[0];

        return this.hub.getFormula()[formula_name];
    }
    fillOmitted() {
        var discrete = this.hub.getNames('discrete');

        _.forEach(discrete, (name) => {
            if (!this.filters.hasOwnProperty(name)) this.filters[name] = new Range(false);
        });
    }
    filter(ingredients, callback) {
        this.fillOmitted();
        this.param_names = _.keys(this.filters);
        var continuos_filters = this.hub.project(this.continuos_filters);

        var formula = this.getFormula(ingredients);

        this.buildFilter(0, {}, (path) => {
            var discrete_params = this.hub.project(path);
            var filters = _.merge(continuos_filters, discrete_params);

            var volumes = _.map(ingredients, (ingredient, name) => {
                var extracted = ingredient.observe(filters[name]);
                var first_key = _.first(_.keys(extracted.getContent()));

                return extracted.getLayerVolume(first_key);
            });

            var composite_volume = formula(volumes);

            if (composite_volume) callback(path, composite_volume)
        });
    }
    buildFilter(depth, path, callback) {
        var name = this.param_names[depth];
        var range = this.filters[name];

        for (var value of range) {
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