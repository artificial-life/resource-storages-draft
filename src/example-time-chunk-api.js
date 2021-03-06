'use strict'

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