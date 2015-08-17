'use strict'

var ContinuosParameter = require('./ContinuosParameter.js');

class VolumeDefinitionParameter extends ContinuosParameter {
    constructor(
        name, default_values
    ) {
        super({
            name: name,
            default_values: default_values
        });
    }
}

module.exports = VolumeDefinitionParameter;