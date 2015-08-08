'use strict'

var Plan = require('./Support/plan.js');
var _ = require('lodash');









class ServicePlans extends Volume {
    constructor() {
        super({
            id1: new VolumeIndex(1, 5),
            time: new PlanParameter()
        });

    }
    build() {
        //load from db here
    }

}



var v = new TestVolume();
//v.build();
var c = new CompositeVolume();