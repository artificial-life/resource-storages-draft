'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./MultiLayerVolume.js');

class CompositeMultiLayer extends MultiLayerVolume {
    constructor(discrete_parameters_description, projection_description, parent) {
        var param_description = {
            description: discrete_parameters_description,
            composite: true
        };
        var LayerVolume = projection_description.getVolume();

        super(param_description, LayerVolume, parent);

        this.projection_description = projection_description;

        this.getParams().setProjection(projection_description.getProjection());
    }
    setFormula(formula) {
        this.formula = formula;
    }
    setIngredients(ingredints_array) {
        this.ingredients = ingredints_array;
    }
    observe(params) {
        var formula = this.projection_description.getFormula();
        var result = this.emptyCopy();

        this.query.reset()
            .addParams(params).filter(this.ingredients, (key_data, layers) => {
                var composite_volume = formula(layers);

                if (composite_volume) {
                    var key_array = this.getParams().keyObjectToArray(key_data);
                    var layer = this.buildLayer(key_array, composite_volume);
                    result.extend(layer);
                }
            });

        return result;
    }
}

module.exports = CompositeMultiLayer;