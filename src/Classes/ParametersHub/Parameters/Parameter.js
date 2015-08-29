'use strict'

var Generator = require('./Generator/Generator.js');

class VolumeParameter {
    constructor({
        discrete, name, default_values
    }) {
        this.is_discrete = discrete;
        this.global_name = name;
        this.default_values = default_values;
        this.type = this.constructor.name.replace('Parameter', '');
    }
    isDiscrete() {
        return !!this.is_discrete;
    }
    isContinuos() {
        return !this.is_discrete;
    }
    getName() {
        return this.global_name;
    }
    getDefault() {
        return this.default_values;
    }
    getDescription() {
        return {
            type: this.type,
            discrete: this.is_discrete,
            name: this.global_name,
            default_values: this.default_values
        };
    }
}

module.exports = VolumeParameter;