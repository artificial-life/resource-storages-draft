'use strict'

var AbstractVolume = require('./AbstractVolume.js');

class BasicVolume extends AbstractVolume {
    constructor(PrimitiveVolume, parent) {
        var parameters_description = PrimitiveVolume.getParamsDescription();
        super(parameters_description, parent);

        this.primitiveVolume = PrimitiveVolume;
        this.content = [];
    }
    buildPrimitiveVolume(item) {
        return new this.primitiveVolume(item.data, item.state);
    }
    extendPrimitive(primitive) {
        return this.content.push(primitive);
    }
    getContent() {
        return this.content;
    }
}

module.exports = BasicVolume;