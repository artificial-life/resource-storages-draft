'use strict'

var AbstractVolume = require('./AbstractVolume.js');

class BasicVolume extends AbstractVolume {
    constructor(parameters_description, parent) {
        super({
            parameters_description: parameters_description
        });

        this.parent = parent || false;
    }
}

module.exports = BasicVolume;