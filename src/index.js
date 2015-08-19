'use strict'

var _ = require('lodash');
var Deco = require('./Classes/ProjectionDecorator.js');

var PlanCollection = require('./PlanCollection.js');
var PrimitiveCollection = require('./PrimitiveCollection.js');
var Composite = require('./CompositeServiceOperators.js');

var operatorCollection = new PlanCollection('operator_id');
var serviceCollection = new PlanCollection('service_id');
var SkillsCollection = new PrimitiveCollection('operator_id', 'service_id');

var composite = new Composite('operator_id', 'service_id');

composite.setIngredients(operatorCollection, serviceCollection, SkillsCollection);
composite.setFormula(function () {

});

//console.log(operatorCollection);

operatorCollection.build(5);
serviceCollection.build(3);
SkillsCollection.build(5, 3);



//var result = operatorCollection.observe({
//    'operator_id': {
//        start: 4,
//        end: 10
//    },
//    'time': {
//        data: [0, 300]
//    }
//});

var observe = SkillsCollection.observe({
    'operator_id': {
        start: 4,
        end: 10
    },
    'service_id': 2,
    'time': {
        data: 600
    }
});

console.log(composite.observe({
    'operator_id': {
        start: 4,
        end: 10
    },
    'service_id': 2,
    'time': {
        data: [0, 600]
    }
}));