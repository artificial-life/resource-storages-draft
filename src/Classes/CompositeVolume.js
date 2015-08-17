'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./MultiLayerVolume.js');

class CompositeVolume extends MultiLayerVolume {
    constructor(discrete_parameters_description, LayerVolume, parent) {
        var param_description = {
            description: discrete_parameters_description,
            composite: true
        };
        super(param_description, LayerVolume, parent)
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
    QueryIngredients() {
        return [];
    }
}

module.exports = CompositeVolume;