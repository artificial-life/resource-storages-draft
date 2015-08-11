'use strict'

var Params = require('./ParametersHub.js');

class AbstractVolume {
    constructor({
        parameters_desc
    }) {
        this.parameters = Params(parameters_desc);
    }

    getParams() {
        return this.parameters;
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