'use strict'

var _ = require('lodash');
var BasicQuery = require('./BasicQuery.js');

class VolumeQuery extends BasicQuery {
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
        var descriptions = Primitive.params_description;
        var search_volume = new Primitive(this.filters);

        return volume.intersection(search_volume);
    }
}

module.exports = VolumeQuery;