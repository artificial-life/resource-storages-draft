'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./Classes/MultiLayerVolume.js');
var PrimitiveVolume = require('./Classes/PrimitiveVolume.js');

class PrimitiveCollection extends MultiLayerVolume {
    constructor(firstIndexName, secondIndex) {
        super([{
            type: "Index",
            name: firstIndexName
            }, {
            type: "Index",
            name: secondIndexName
            }], Plan, parent);
    }
}

module.exports = PrimitiveCollection;