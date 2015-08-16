'use strict'

var AbstractVolume = require('./AbstractVolume.js');

class BasicVolume extends AbstractVolume {
    constructor(PrimitiveVolume, parent) {
        var parameters_description = PrimitiveVolume.getParamsDescription();
        super(parameters_description, parent);

        this.PrimitiveVolume = PrimitiveVolume;
        this.content = [];
    }
    buildPrimitiveVolume(item) {
        return item instanceof this.PrimitiveVolume ? item : new this.PrimitiveVolume(item.data, item.state);
    }
    extendPrimitive(primitive) {
        this.content.push(primitive);
        return this;
    }
    getContent() {
        return this.content;
    }
}

module.exports = BasicVolume;