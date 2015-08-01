'use strict'

var _ = require('lodash');

var boot = require('./boot.js');

boot();

//Do test stuff

var DBCollection = require('./Storage/DB/Collection/collection.js');
var Plan = require('./Support/plan.js');

var Skills = new DBCollection('Skills');
var Operators = new DBCollection('Operator');
var Services = new DBCollection('Service');

/*==========================================*/

var OSSCompose = (operators, services, skills) => {
    return _.map(operators, (operator, i) => {

        return _.map(services, (service, j) => {
            return skills[i][j] ? operator.intersection(service) : new Plan([])
        });

    });
};

var TimeSlots = {
    formula: OSSCompose,
    ingredients: [Operators, Services, Skills],
    volume: {
        total_space: null,
        waiting_allocation: [],
        current_state: null,
        find: function (params) {
            var service_id = params.service_id;
            var operator_id = params.operator_id || '*';

            var result = false;
            console.log(operator_id);
            if (operator_id === '*') {
                result = [];
                _(this.current_state).forEach((plan) => {

                    var t = plan[service_id].observe(params);

                    if (t.length > 0) {
                        result.push(t);
                    }
                }).value();
            } else {
                var plan = this.current_state[operator_id][service_id];
                result = plan.observe(params);
            }
            return result;
        }
    },
    reserve: function (params) {
        if (!params.operator_id) console.log('will try to reserve any operator');

        var volume = this.volume;

        var slots = volume.find({
            service_id: params.service_id,
            startTime: params.startTime,
            endTime: params.endTime,
            operator_id: params.operator_id,
            count: params.count
        });

        console.log(slots);

        switch (slots.length) {
        case 0:
            console.log('Not Allocated');
            break;
        case 1:
            console.log('Allocated');
            break;
        default:
            console.log('Multiple variants');
            console.log('Push to not allocated');
        }

        return true;
    },
    observe: function (params) {
        this.checkVolume(params);
        return this.volume.current_state;
    },
    checkVolume: function (params) {
        var default_params = {};

        params = params || default_params;

        if (!this.total_space) {
            var args = _.map(this.ingredients, (ingredient) => ingredient.observe(params));

            this.volume.total_space = this.volume.current_state = this.formula.apply(this, args);
        }
    }

};


var TimeSlotReduce = function (timeslots) {
    var reduced = [];
    _(timeslots).forEach((operator, i) => {
            _(operator).forEach((service, j) => {
                if (!reduced[j]) {
                    reduced[j] = service.copy();
                    return true;
                }
                var temp = reduced[j];
                reduced[j] = temp.union(service);
                //reduced[j] = reduced[j].union(service);
            }).value();
        })
        .value();
    return reduced;
}


var FreeTimeSlotStorage = {
    formula: TimeSlotReduce,
    ingredients: [TimeSlots],
    volume: {
        total_space: null,
        waiting_allocation: [],
        current_state: null,
        find: function (params) {
            var service = params.service;
            var plan = this.current_state[service];

            if (!plan) return false;
            return plan.observe(params);
        }
    },
    reserve: function (params = {}) {
        this.checkVolume(params);

        var service = params.service_id;

        if (_.isUndefined(service) || _.isNull(service)) {
            throw Error('service required');
        }

        var operator = params.operator_id || false;
        var time = params.time_chunk || false;

        var volume = this.volume;

        var minute_slot = volume.find({
            size: 60 * 1000,
            service: service,
            count: 1
        });

        if (!minute_slot) throw new Error('can not find free space');
        var [[startTime, endTime]] = minute_slot;

        var result = this.ingredients[0].reserve({
            service_id: service,
            startTime: startTime,
            endTime: endTime,
            count: 1
        });

        if (!result) throw new Error('can not allocate enought space');

        var FreeSlot = {
            startTime: startTime,
            endTime: endTime,
            slot_id: Math.random(),
            service_id: service,
            operator_id: result.operator_id
        }

        return FreeSlot;
    },
    observe: function (params) {
        this.checkVolume(params);
        return this.volume.current_state;
    },
    checkVolume: function (params) {
        var default_params = {};

        params = params || default_params;

        if (!this.total_space) {
            var args = _.map(this.ingredients, (ingredient) => ingredient.observe(params));

            this.volume.total_space = this.volume.current_state = this.formula.apply(this, args);
        }
    }
};

console.log(FreeTimeSlotStorage.reserve({
    service_id: 0
}));