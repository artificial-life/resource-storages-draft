'use strict'

var DiscreteParameter = require('./DiscreteParameter.js');

class IndexKey {
    constructor(data) {
        this.data = data;
    }
    toString() {
        return this.data;
    }
}

class IndexParameter extends DiscreteParameter {
    constructor(
        name = 'deafult_index', default_values = {
            start: 0,
            end: Infinity
        }) {
        super({
            name, default_values
        });
    }
    makeKey(data) {
        return new IndexKey(data);
    }

}

module.exports = IndexParameter;