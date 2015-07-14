'use strict'

var Abstract = require('../Abstract/abstract.js');
var _ = require('lodash');

class PlanStorage extends Abstract {
    constructor(Schedule, default_chunk_size) {
        this.schedule = Schedule;
        this.chunk_size = default_chunk_size;
    }
    compose(params) {
        var Resource = 'Йа сделял!';



        return Resource;
    }
    observe(params) {
        var example_params = {
            chunk: 1000 * 60 * 5, //(msec) default : default_chunk_size
            count: 10, // default : null
            starts_from: 0, //default : now
            ends_at: 46800000, // default : null
            criteria: {} //specific to resource type
        };

        var result = this.schedule.observe(example_params);

        return result;
    }
    now() {
        return _.now();
    }
}

module.export = PlanStorage;