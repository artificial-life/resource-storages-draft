'use strict'
var CompositeMultiLayer = require('./Classes/CompositeMultiLayer.js');
var ProjectionDescription = require('./Classes/ProjectionDescription.js');
var Plan = require('./Plan.js');

//ingredients : CompositeSeviceOperator as office_schedule
//goal: reduce Operators
//formula: union by service

class CompositeService extends CompositeMultiLayer {
    constructor(firstId, parent) {
        super(parent);

        this.description = [{
                type: "Index",
                name: firstId,
                projection: (index) => {
                    return {
                        'office_schedule': index,
                    };
                }
            }
            /*, {
                        type: "Index",
                        name: secondId,
                        projection: (index) => {
                            return {
                                'services': index,
                                'skills': index
                            };
                        }
        }*/
            ];

        this.layer_decoration = {
            projection: (time) => {
                return {
                    'office_schedule': time
                };
            },
            formula: (volumes_to_reduce) => {
                var united_volume = _.first(volumes_to_reduce) || false;

                _.forEach(volumes_to_reduce, (volume) => {
                    united_volume = united_volume.intersection(volume)
                });

                return united_volume;
            }
        };

        this.init_params = [].slice.apply(arguments);
    }
    get LayerVolume() {
        return Plan;
    }

}

module.exports = CompositeService;