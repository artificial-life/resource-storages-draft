'use strict'
require("babel/polyfill");
var _ = require('lodash');

var PlanCollection = require('./PlanCollection.js');
var PrimitiveCollection = require('./PrimitiveCollection.js');
var Composite = require('./CompositeServiceOperators.js');
var Reduce = require('./CompositeService.js');

var operatorCollection = new PlanCollection('operator_id');
var serviceCollection = new PlanCollection('service_id');
var SkillsCollection = new PrimitiveCollection('operator_id', 'service_id');

var office_shcedule = new Composite('operator_id', 'service_id');
//var reduce = new Reduce('operator_id');


office_shcedule.setIngredients({
    operators: operatorCollection,
    services: serviceCollection,
    skills: SkillsCollection
});

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

var ob_skills = SkillsCollection.observe({
    'operator_id': {
        start: 0,
        end: 10
    },
    'service_id': 2
});

var ob_comp = office_shcedule.observe({
    'operator_id': {
        start: 0,
        end: 4
    },
    'service_id': 2,
    'time': {
        data: [150, 300]
    }
});

console.log(ob_comp.getContent('2|2').getContent().getContent());

var BoxedSlots = require('./BoxedSlotsVolume.js');

var timeslots = new BoxedSlots('operator_id', 'service_id');

timeslots.setIngredients({
    socomposite: office_shcedule
});

var requests = timeslots.observe({
    'operator_id': 1,
    'service_id': 1,
    'time': {
        data: [0, 1000],
        size: 98
    }
});