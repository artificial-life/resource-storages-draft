'use strict'

var boot = require('./boot.js');

boot();


//Do test stuff

var PlanStorage = require('./Storage/Plan/plan.js');
var Schedule = require('./Support/schedule.js');
var TimeChunk = require('./Support/time-chunk.js');

var tch = new TimeChunk([28800000, 46800000]);

var result = tch.addParam('startTime', 30800000)
    .addParam('endTime', 40000000)
    .addParam('size', 1000000)
    .addParam('count', 7).query();

console.log(result);
console.log(result.length);

result = tch.reserve();

console.log(result);
console.log(result.slots.length);

result = tch.query();

console.log(result);
console.log(result.length);

var init = [
    {
        chunk: [28800000, 46800000],
        is_filled: false
    },
    {
        chunk: [50400000, 64800000],
        is_filled: false
    }
];

var schedule = new Schedule(init);

var pStorage = new PlanStorage(schedule);

var r = schedule.observe({
    startTime: 38800000,
    endTime: 68800000,
    size: 1000000,
    count: 10
});

console.log(r);

r = schedule.reserve({
    startTime: 38800000,
    endTime: 68800000,
    size: 1000000,
    count: 10
});

console.log(r);

console.log(schedule.chunks);