'use strict'

var VolumeParameter = require('./Parameter.js');

//var KeyModel = {};

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