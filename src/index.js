'use strict'

var boot = require('./boot.js');

boot();


//Do test stuff

var PlanStorage = require('./Storage/Plan/plan.js');
var Schedule = require('./Support/schedule.js');
var TimeChunk = require('./Support/time-chunk.js');

var tch = new TimeChunk([28800000, 46800000]);

var result = tch.addParam('startTime', 28800000)
    .addParam('endTime', 40000000)
    .addParam('size', 1000000)
    .addParam('count', 7).query();

console.log(result);
console.log(result.length);

result = tch.reserve();

console.log(result);
console.log(result.length);

result = tch.query();

console.log(result);
console.log(result.length);

var init = [
    [28800000, 46800000],
    [50400000, 64800000]
];

var schedule = new Schedule(init);

var pStorage = new PlanStorage(schedule);