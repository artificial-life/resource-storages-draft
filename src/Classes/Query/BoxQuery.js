'use strict'

var _ = require('lodash');

var CompositeQuery = require('./CompositeQuery.js');

class BoxQuery extends CompositeQuery {
    constructor(box, params_hub) {
        super(params_hub);
        this.box = box;
    }
    filter(ingredients, callback) {
        this.param_names = _.keys(this.filters);
        var continuos_filters = this.hub.project(this.continuos_filters);

        var formula = (parts) => {
            if (!parts) return false;
            return this.box.makeFromSource(ingredients);
        };

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
}

module.exports = BoxQuery;