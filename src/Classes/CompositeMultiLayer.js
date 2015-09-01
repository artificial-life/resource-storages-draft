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
        this.parameters = ParametersHub.create('composite', discrete_parameters_description);
        this.attachQuery();
    }
    set Volume(data) {
        super.Volume = data.Volume;
        this.getParams().setContinuosDecorators(data.decoration);

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