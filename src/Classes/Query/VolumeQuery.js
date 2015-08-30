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
        var search_volume = new Primitive(this.filters);

        //@TODO: rework it later
        //@TODO: also, this is ugly
        var name = Primitive.params_description[0].name;
        var size = this.filters[name].size || false;

        var result = volume.intersection(search_volume)

        if (size) result = result.split(size);

        return result;
    }
}

module.exports = VolumeQuery;