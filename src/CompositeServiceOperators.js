'use strict'

var _ = require('lodash');

var CompositeMultiLayer = require('./Classes/CompositeMultiLayer.js');
var Plan = require('./Plan.js');

class SOComposite extends CompositeMultiLayer {
    constructor(firstId, secondId, parent) {
        super(parent);
        this.description = [{
            type: "Index",
            name: firstId,
            projection: (index) => {
                return {
                    'operators': index,
                    'skills': index
                };
            }
            }, {
            type: "Index",
            name: secondId,
            projection: (index) => {
                return {
                    'services': index,
                    'skills': index
                };
            }
            }];

        this.layer_decoration = {
            projection: (time) => {
                return {
                    'operators': time,
                    'services': time
                };
            },
            formula: ([operator_volume, service_volume, skill]) => {
                if (!operator_volume || !service_volume || !skill) return false;

                return operator_volume.intersection(service_volume).intersection(skill);
            }
        };

        this.init_params = [].slice.apply(arguments);
    }
    get LayerVolume() {
        return Plan;
    }

}

module.exports = SOComposite;