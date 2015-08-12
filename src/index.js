'use strict'

var PlanCollection = require('./PlanCollection.js');

var operatorCollection = new PlanCollection('operator_id');
var serviceCollection = new PlanCollection('service_id');

//console.log(operatorCollection);

operatorCollection.build(5);
serviceCollection.build(3);

console.log(operatorCollection.getParams().by_name);