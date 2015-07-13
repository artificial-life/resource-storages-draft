'use strict'

var Abstract = require('../Abstract/abstract.js');

class PlanStorage extends Abstract {
    constructor(Schedule) {
        this.schedule = Schedule;
    }
    compose(params) {
        var Resource = 'Йа сделял!';
        console.log(Resource);
        return Resource;
    }
    observe(params) {}
}

module.export = PlanStorage;