'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./MultiLayerVolume.js');

class CompositeMultiLayer extends MultiLayerVolume {
    constructor(parent) {
        super(parent);
        this.ingredients = {};
    }
    set description(discrete_parameters_description) {
        var param_description = {
            description: discrete_parameters_description,
            composite: true
        };
        super.description = param_description;
    }
    set layer_decoration(decoration) {
        this.getParams().setContinuosDecorators(decoration);
    }
    get LayerVolume() {
        throw new Error('CompositeMultiLayer abstract method');
    }
    setIngredients(ingredients) {
        this.ingredients = ingredients
    }
    observe(params) {
        var result = this.emptyCopy();

        this.query.reset()
            .addParams(params).filter(this.ingredients, (key, composed) => {
                var layer = this.buildLayer(key, composed);
                result.extend(layer);
            });

        return result;
    }
}

module.exports = CompositeMultiLayer;