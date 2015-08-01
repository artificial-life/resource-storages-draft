'use strict'

var Abstract = require('../Abstract/abstract.js');
var _ = require('lodash');

class PlanStorage extends Abstract {
    constructor() {
        super();
    }
    compose(params) {
        var Resource = 'Йа сделял!';



        return Resource;
    }
    observe(object_type, object_id, params) {
        var example_params = {
            size: 1000 * 60 * 5, //(msec) default : default_chunk_size
            count: 10, // default : null
            startTime: 0, //default : now
            endTime: 46800000, // default : null
            criteria: {} //specific to resource type
        };

        var plan = this.getPlan(object_type, object_id, time_range);

        var result = Plan.observe(params);

        return result;
    }
    getPlan(object_type, object_id, time_range) {
        var plan_id = strategy();
        var Plan = 'plan object';
        return Plan;
    }
}

module.exports = PlanStorage;