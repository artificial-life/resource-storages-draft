'use strict'

var AbstractVolume = require('./AbstractVolume.js');
var ZeroDimensional = require('./ZeroDimensionalVolume.js');

class BasicVolume extends AbstractVolume {
    constructor(parent) {
        super(parent);
        this.description = this.PrimitiveVolume.params_description;
        this.content = [];
    }
    static get PrimitiveVolume() {
        throw new Error('BasicVolume: Abstract static property call');
    }
    get PrimitiveVolume() {
        throw new Error('BasicVolume: Abstract property call');
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
    extractContent(item) {
        var is_same_type = item.constructor.name === this.constructor.name;

        var is_primitive = item instanceof this.PrimitiveVolume;
        var is_zero_dim = item instanceof ZeroDimensional;

        if (!(is_same_type || is_primitive || is_zero_dim)) throw new Error('Can not extract');

        var content = [];

        if (is_zero_dim) {
            var state = item.getContent().getState();
            var default_primitive = new this.PrimitiveVolume([], state);
            return [default_primitive];
        } else content = is_same_type ? item.getContent() : [item]


        return content;
    }
}

module.exports = BasicVolume;