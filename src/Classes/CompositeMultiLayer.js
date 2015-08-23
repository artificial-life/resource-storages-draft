'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./MultiLayerVolume.js');

class CompositeMultiLayer extends MultiLayerVolume {
    constructor(parent) {
        super(parent);
        this.ingredients = {};
    }
    get projection_description() {
        throw new Error('CompositeMultiLayer abstract method');
    }
    set description(discrete_parameters_description) {
        var param_description = {
            description: discrete_parameters_description,
            composite: true
        };
        super.description = param_description;
        //@TODO 

        this.getParams().setProjection(this.projection_description.getProjection());
    }
    get LayerVolume() {
        return this.projection_description.getVolume();
    }
    setIngredients(ingredients) {
        this.ingredients = ingredients
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