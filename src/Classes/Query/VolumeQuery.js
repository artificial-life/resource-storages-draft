'use strict'

var _ = require('lodash');
var Abstract = require('./AbstractQuery.js');

class VolumeQuery extends Abstract {
    constructor(params_hub, default_params = {}) {
        super(params_hub, 'continuos');
    }
    addParam(key, value) {
        var description = this.hub.getParamByName(key);

        if (!description || description.isDiscrete()) return this;

        this.filters[key] = value;

        return this;
    }
    filter(volume) {
        var Primitive = volume.PrimitiveVolume;
        var descriptions = Primitive.getParamsDescription();
        var search_volume = new Primitive(this.filters);

        return volume.intersection(search_volume);
    }
}

module.exports = VolumeQuery;