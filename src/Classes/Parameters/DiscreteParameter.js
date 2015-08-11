'use strict'

var VolumeParameter = require('./VolumeParameter.js');

class DiscreteParameter extends VolumeParameter {
    constructor({
        name, default_values
    }) {
        super({
            discrete: true,
            name: name,
            default_values: default_values
        });
    }
}

module.exports = DiscreteParameter;