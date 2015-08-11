'use strict'


var _ = require('lodash');

class Layer {
    constructor(key, content, parent) {

        if (!content) return false;

        this.key = key;
        this.content = content;
        this.parent = parent || false;
    }
    getKey() {
        return this.key;
    }
    getKeyArray() {
        return _.map(this.key, (key_component) => {
            return key_component.toString();
        });
    }
    getContent() {
        return this.content;
    }
    getParams() {
        return this.content.getParams();
    }
    extend(layer) {
        var is_same = _.difference(layer.getKeyArray(), this.getKeyArray()).length === 0;

        if (!is_same) throw Error('Keys not equal');

        var ext_content = layer.getConent();

        this.content.extend.apply(this.content, ext_content);
        return this;
    }
    observe() {
        return new Layer(this.key, this.content.observe.apply(this.content, arguments), this.parent || this);
    }
    reserve() {
        //fully reserved link to layer or false
        return new Layer(this.key, this.content.reserve.apply(this.content, arguments), this.parent || this);
    }
    union() {
        return new Layer(this.key, this.content.union.apply(this.content, arguments), false);
    }
    negative() {
        return new Layer(this.key, this.content.negative.apply(this.content, arguments), false);
    }
    intersection() {
        return new Layer(this.key, this.content.intersection.apply(this.content, arguments), false);
    }

}

module.exports = Layer;