'use strict'

var PlanCollection = require('./PlanCollection.js');

var operatorCollection = new PlanCollection('operator_id');
var serviceCollection = new PlanCollection('service_id');

//console.log(operatorCollection);

operatorCollection.build(5);
serviceCollection.build(3);

operatorCollection.observe({
    'operator_id': {
        start: 1,
        end: 10
    },
    'time': {
        data: [0, 100]
    }
});