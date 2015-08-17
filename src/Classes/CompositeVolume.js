'use strict'

var MultiLayerVolume = require('./MultiLayerVolume.js');

class CompositeVolume extends MultiLayerVolume {
    constructor(discrete_parameters_description, LayerVolume, parent) {
        super(discrete_parameters_description, LayerVolume, parent)
    }
    setFormula(formula) {
        this.formula = formula;
    }
    setIngregients(ingredints_array) {
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