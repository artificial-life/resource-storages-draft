'use strict'

var _ = require('lodash');

class CompoundKey {
    constructor(key_content) {
        this.key_content = key_content;
    }
    getKey() {
        return this.key_content;
    }
    getKeyString() {
        var glue = '|';
        return this.getKeyArray().join(glue);
    }
    getKeyArray() {
        return _.map(this.key_content, (key_component) => {
            return key_component.toString();
        });
    }
}

module.exports = CompoundKey;