'use strict'

var boot = require('./boot.js');

boot();


//Do test stuff

var PlanStorage = require('./Storage/Plan/plan.js');
var Schedule = require('./Support/schedule.js');

var init = [
    [28800000, 46800000],
    [50400000, 64800000]
];

var schedule = new Schedule(init);

var pStorage = new PlanStorage(schedule);