'use strict'

var _ = require('lodash');

var BasicVolume = require('./BasicVolume.js');
var PrimitiveVolume = require('./PrimitiveVolume.js');


class ZeroDimensional extends BasicVolume {
    constructor(parent) {
        super(ZeroDimensional.getPrimitiveVolumeType(), parent);
        this.content = {};
    }
    static getPrimitiveVolumeType() {
        return PrimitiveVolume;
    }
    buildPrimitiveVolume(item) {
        var q = new this.PrimitiveVolume(item.state);
        return item instanceof this.PrimitiveVolume ? item : new this.PrimitiveVolume(item.state);
    }
    extendPrimitive(primitive) {
        if (!_.isEmpty(this.content)) throw Error('Content already set');
        this.content = primitive;
        return this;
    }
    build(data) {
        var primitive_volume = this.buildPrimitiveVolume(data);
        this.extendPrimitive(primitive_volume, false);
    }
    observe() {
        var result = new ZeroDimensional(this);
        var state = this.getContent().getState();
        result.build({
            state: state
        });
        return result;
    }
}

module.exports = ZeroDimensional