'use strict'

var boot = require('./boot.js');

boot();


//Do test stuff

var PlanStorage = require('./Storage/Plan/plan.js');

var schedule = [
    [28800000, 46800000],
    [50400000, 64800000]
]; //instanceof Schedule (container of TimeChunks)

var pStorage = new PlanStorage(schedule);