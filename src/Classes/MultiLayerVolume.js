'use strict'

var _ = require('lodash');

var BasicVolume = require('./BasicVolume.js');
var AbstractVolume = require('./AbstractVolume.js');
var Layer = require('./Layer.js');

var bind = _.spread(_.bind);

class MultiLayerVolume extends AbstractVolume {
    constructor(parent) {
        super(parent);
        this.layers = {};
    }
    set description(discrete_params_description) {
        var volume_params_description = this.LayerVolume.PrimitiveVolume.params_description;
        var description = volume_params_description.concat(discrete_params_description);

        super.description = description;
    }
    get LayerVolume() {
        throw new Error('MultiLayerVolume abstract property');
    }
    getContent(key) {
        if (!key) {
            return this.layers;
        } else if (this.layers.hasOwnProperty(key)) {
            return this.layers[key];
        } else return false;
    }
    getLayerVolume(key) {
        if (this.layers.hasOwnProperty(key)) {
            return this.layers[key].getContent();
        } else
            return false;
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
    emptyCopy() {

        var ML = bind([this.constructor, this].concat(this.init_params));
        var result = new ML();
        result.parent = this;

        return result;
    }
    observe(params) {
        var result = this.emptyCopy();

        this.query.reset()
            .addParams(params)
            .filter(this.getContent(), (observed) => {
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