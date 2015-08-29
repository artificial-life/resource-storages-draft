'use strict'

var _ = require('lodash');

var MultiLayerVolume = require('./Classes/MultiLayerVolume.js');
var ZeroDimensional = require('./Classes/ZeroDimensionalVolume.js');

class PrimitiveCollection extends MultiLayerVolume {
    constructor(firstIndexName, secondIndexName, parent) {
        super(parent);
        this.description = [{
            type: "Index",
            name: firstIndexName
            }, {
            type: "Index",
            name: secondIndexName
            }];

        this.Volume = new ZeroDimensional();

        this.init_params = [].slice.apply(arguments);
    }
    build(first_count, second_count) {
        //only test
        var counter = 0;
        for (var i = 0; i < first_count; i += 1) {
            for (var j = 0; j < second_count; j += 1) {
                counter += 1;
                var state = (counter % 2) ? 'a' : 'na';
                var layer = this.buildLayer([i, j], {
                    state: state
                });
                this.extend(layer);
            }
        }
    }
}

module.exports = PrimitiveCollection;