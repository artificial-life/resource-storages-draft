'use strict'

var BasicVolume = require('./BasicVolume.js');
var AbstractVolume = require('./AbstractVolume.js');
var Layer = require('./Layer.js');


class MultiLayerVolume extends AbstractVolume {
    constructor(parameters_description, LayerVolume, parent) {
        super(parameters_description, parent);
        this.params_set = false;
        this.LayerVolume = LayerVolume;
        this.layers = {};
    }
    build() {
        throw new Error('abstract method. Must be specified directly in child');
    }
    buildLayer(id_array, volume_data) {
        if (!volume_data) throw new Error('volume data required');

        var volume = {};
        if (volume_data instanceof AbstractVolume) {
            volume = volume_data
        } else {
            volume = new this.LayerVolume();
            volume.build(volume_data);
        }

        var key_objects = this.getParams().makeKey(id_array);
        var layer = new Layer(key_objects, volume);

        //@TODO:get it from this.LayerVolume

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