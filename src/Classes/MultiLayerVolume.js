'use strict'

var BasicVolume = require('./BasicVolume.js');
var AbstractVolume = require('./AbstractVolume.js');
var Layer = require('./Layer.js');


class MultiLayerVolume extends BasicVolume {
    constructor(parameters_description, parent) {
        super(parameters_description, parent);
        this.params_set = false;
    }
    buildLayer(id_array, volume) {
        if (!(volume instanceof AbstractVolume)) throw new Error('volume required');

        var key_objects = this.getParams().makeKey(id_array);
        var layer = new Layer(key_objects, volume);

        if (!this.params_set) {
            this.params_set = true;
            var continuos_params = layer.getParams().Continuos();
            this.getParams().addParams(continuos_params);
        }

        return layer;
    }
    extend(layer) {
        var key_array = layer.getKeyArray();
        var key_string = key_array.join('|');

        if (!this.layers.hasOwnProperty(key_string)) {
            this.layers[key_string] = layer;
            return this;
        }

        this.layers[key_string].extend(layer);

        return this;
    }
    observe(params) {
        var result = new MultiLayerVolume(this.getParams().getDesription(), this);

        _.forEach(this.layers, (layer) => result.extend(layer.observe(params)));

        return result;
    }
    reserve(params) {
        var result = new MultiLayerVolume(this.getParams().getDesription(), this);

        _.forEach(this.layers, (layer) => {
            var result_layer = layer.reserve(params);

            if (!result_layer) {
                result = false;
                return false;
            }

            result.extend(result_layer);
        });

        return result;
    }
}

module.exports = MultiLayerVolume;