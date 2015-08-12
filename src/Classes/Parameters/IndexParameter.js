'use strict'

var DiscreteParameter = require('./DiscreteParameter.js');

class IndexKey {
    constructor(data, name) {
        this.data = data;
        this.param_name = name;
    }
    toString() {
        return this.data;
    }
    getName() {
        return this.param_name;
    }
}

class IndexParameter extends DiscreteParameter {
    constructor(
        name = 'defualt_index', default_values = {
            start: 0,
            end: Infinity
        }) {
        super({
            name, default_values
        });
    }
    makeKey(data) {
        return new IndexKey(data, this.getName());
    }

}

module.exports = IndexParameter;