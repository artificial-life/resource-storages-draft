'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./MultiLayerVolume.js');
var ParametersHub = require('./ParametersHub/ParametersHub.js');

class CompositeMultiLayer extends MultiLayerVolume {
    constructor(parent) {
        super(parent);
        this.ingredients = {};
    }
    set description(discrete_parameters_description) {
        var volume_params_description = this.LayerVolume.PrimitiveVolume.params_description;
        var description = volume_params_description.concat(discrete_parameters_description)

        this.parameters = ParametersHub.create('composite', description);
        this.attachQuery();
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