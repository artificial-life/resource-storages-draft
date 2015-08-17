'use strict'

var BasicVolume = require('./BasicVolume.js');
var AbstractVolume = require('./AbstractVolume.js');
var Layer = require('./Layer.js');

class MultiLayerVolume extends AbstractVolume {
    constructor(discrete_parameters_description, LayerVolume, parent) {
        super(discrete_parameters_description, parent);
        this.LayerVolume = LayerVolume;

        var volume_params_description = LayerVolume.getPrimitiveVolumeType().getParamsDescription();
        this.addParams(volume_params_description);

        this.layers = {};
    }
    getContent() {
        return this.layers;
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

        return layer;
    }
    extend(layer) {
        var key_string = layer.getKeyString();
        if (!this.layers.hasOwnProperty(key_string)) {
            this.layers[key_string] = layer;
            return this;
        }

        this.layers[key_string].extend(layer);

        return this;
    }

    observe(params) {
        var ML = this.constructor.bind(this, this.init_params);
        var result = new ML();

        this.query.reset().addParams(params).filter(this.getContent(), (layer, continuos_params) => {
            //console.log(layer, continuos_params);               
            var observed = layer.observe(continuos_params);
            result.extend(observed);
        });

        return result;
    }
    reserve(params) {
        var result = new MultiLayerVolume(this.getParams().getDescription(), this);

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