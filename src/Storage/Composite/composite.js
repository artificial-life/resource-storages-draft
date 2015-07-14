'use strict'

var Abstract = require('../Abstract/abstract.js');

class CompositeStorage extends Abstract {
    constructor(Formula) {
        super();
        this.formula = Formula;
    }
    compose(params) {
        var Resource = 'Йа сделял!';
        console.log(Resource);
        return Resource;
    }
    observe(params) {}
}

module.exports = CompositeStorage;