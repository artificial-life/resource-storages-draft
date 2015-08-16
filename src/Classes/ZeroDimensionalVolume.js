'use sctrict'

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
}

module.exports = ZeroDimensional