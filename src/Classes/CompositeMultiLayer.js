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
    build() {
        var ingridient_volumes = this.QueryIngredients();
        var content = this.formula(ingridient_volumes);
    }

}

module.exports = CompositeMultiLayer;