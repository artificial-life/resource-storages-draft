'use strict'

var ParametersHub = require('./ParametersHub/ParametersHub.js');
var Query = require('./Query/query.js');

class AbstractVolume {
    constructor(parameters_description, parent) {
        this.parameters = ParametersHub.create(parameters_description, true);
        this.parent = parent || false;
        this.query = Query.create(this.getParams());
    }
    addParams(params_descriptions) {
        this.getParams().addParamsDescription(params_descriptions);
        return this;
    }
    getParams() {
        return this.parameters;
    }
    getContent() {
        throw new Error('Abstract function');
    }
    build() {
        throw new Error('Abstract function');
    }
    extend() {
        throw new Error('Abstract function');
    }
    union() {
        throw new Error('Abstract function');
    }
    intersection() {
        throw new Error('Abstract function');
    }
    negative() {
        throw new Error('Abstract function');
    }
    observe(params) {
        throw new Error('Abstract function');
    }
    reserve(params) {
        throw new Error('Abstract function');
    }
}

module.exports = AbstractVolume;