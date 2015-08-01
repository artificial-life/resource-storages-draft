'use strict'
/*-----------require-----------*/
var Queue = require('custom-queue');

var DBCollection = require('./Storage/DB/Collection/collection.js');
var Workflow = require('./workflow.js');
/*-----------------------------*/

var TimeSlotReduce = function () {

};

//OperatorsServicesSkillsCompose
var OSSCompose = function () {

};

var FreeTimeSlotConsume = function () {

};

//BookedTimeSlot_SkillsCompose
var BTSSCompose = function () {

};

var ProcessingTimeSlotConsume = function () {

};

const Processes = {
    FreeTimeSlot: {
        formula: TimeSlotReduce,
        ingredients: {
            TimeSlot: {
                formula: OSSCompose,
                ingredients: {
                    OperatorCollection: new DBCollection('Operator'),
                    ServiceCollection: new DBCollection('Service'),
                    SkillsCollection: new DBCollection('Skills'),
                }
            }
        }
    },
    BookedTimeSlot: {
        formula: FreeTimeSlotConsume,
        ingredients: {
            FreeTimeSlot: this.FreeTimeSlot
        }
    },
    ProcessingTimeSlot: {
        formula: PossibleSlotConsume,
        ingredients: {
            PossibleSlot: {
                formula: BTSSCompose,
                ingredients: {
                    BookedTimeSlot: this.BookedTimeSlot,
                    SkillsCollection: new DBCollection('Skills')
                }
            }
        }
    },
    ProcessedTimeSlot: {
        formula: ProcessingTimeSlotConsume,
        ingredients: {
            ProcessingTimeSlot: this.ProcessingTimeSlot
        }
    }
};



var workflow = new Workflow(Processes);

var BookedStorage = workflow('BookedTimeSlot');
var FreeTimeSlot = workflow('FreeTimeSlot');

const day_range = [0, 86400 * 1000];

queue.on('terminal.event.book', function (service_id) {
    var range = day_range;

    var request = BookedStorage.reserve(service_id, range);

});

queue.on('terminal.event.pre-book', function (service_id, day_range) {
    var request = BookedStorage.observe(service_id, day_range);
    return request;
});