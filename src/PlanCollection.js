'use strict'

var _ = require('lodash');
var MultiLayerVolume = require('./Classes/MultiLayerVolume.js');
var Plan = require('./Plan.js');


class PlanCollection extends MultiLayerVolume {
    constructor(indexGlobalName, parent) {
        super([{
            type: "Index",
            name: indexGlobalName
            }], Plan, parent);
        this.init_params = [].slice.apply(arguments);
    }
    build(count) {
        var primitive_volumes_data = [{
            data: [[0, 100]],
            state: 'a'
        }, {
            data: [[200, 400]],
            state: 'a'
        }];

        for (var i = 0; i < count; i += 1) {
            var layer = this.buildLayer([i], primitive_volumes_data);
            this.extend(layer);
        }
    }
}

module.exports = PlanCollection;