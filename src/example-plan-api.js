var Plan = require('./Support/plan.js');



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

var schedule = new Plan(init);

setTimeout(() => {
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

    console.log(schedule.getData());
}, 1000);