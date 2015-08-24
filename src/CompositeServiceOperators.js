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
            generator: {
                action: (index) => {
                    return {
                        'operators': index,
                        'skills': index
                    };
                },
                type: 'projection'
            }
            }, {
            type: "Index",
            name: secondId,
            generator: {
                action: (index) => {
                    return {
                        'services': index,
                        'skills': index
                    };
                },
                type: 'projection'
            }
            }];

        this.layer_decoration = [{
            generator: {
                action: (time) => {
                    return {
                        'operators': time,
                        'services': time
                    };
                },
                type: 'projection'
            },
            formula: ([operator_volume, service_volume, skill]) => {
                if (!operator_volume || !service_volume || !skill) return false;

                return operator_volume.intersection(service_volume).intersection(skill);
            }
        }];

        this.init_params = [].slice.apply(arguments);
    }
    get LayerVolume() {
        return Plan;
    }

}

module.exports = SOComposite;