'use strict'

var VolumeParameter = require('./Parameter.js');

class ContinuosParameter extends VolumeParameter {
    constructor({
        name, default_values
    }) {
        super({
            discrete: false,
            name: name,
            default_values: default_values
        });
    }
}

module.exports = ContinuosParameter;