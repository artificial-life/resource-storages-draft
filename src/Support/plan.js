'use strict'

var _ = require('lodash');
var Volume = require('./volume.js');
var TimeChunk = require('./time-chunk.js');

class Plan /*extends Volume*/ {
    constructor(plan_id, schedule_id) {
        //super(chunk_array);
        this.chunks = [];

        this.ready = this.getPlanFromDb(plan_id).then((plan) => {
            if (plan) return plan.chunks;
            return this.getScheduleFromDb(schedule_id);
        }).then((chunk_array) => {
            this.chunks = _.map(chunk_array, (item) => {
                return new TimeChunk(item.chunk, item.is_filled)
            });

            return true;
        });

    }
    getPlanFromDb(plan_id) {
        //db actions here
        console.log('try to load from db');
        return Promise.resolve(false);
    }
    getScheduleFromDb(schedule_id) {
        //db actions here
        //and make plan from schedule: transform relative time to absolute, is_filled: false, etc
        console.log('try to make plans from schedule');
        var now = 0;
        return Promise.resolve([
            {
                chunk: [now + 28800000, now + 46800000],
                is_filled: false
            },
            {
                chunk: [now + 50400000, now + 64800000],
                is_filled: false
            }]);
    }
    observe(params) {
        //@TODO:avoid code duplication

        var sum_length = 0;
        var left_slots = params.count || 9999;

        var results = _.map(this.chunks, (chunk) => {
            //@TODO: use now() also

            var result = chunk.resetQuery()
                .addParams(params)
                .addParam('count', left_slots)
                .query();

            if (!result) return false;

            left_slots -= result.length;

            return result;
        });

        var proccessed_results = this._processResults(results);

        return proccessed_results;
    }
    reserve(params) {
        //@TODO:avoid code duplication

        var sum_length = 0;
        var left_slots = params.count || 9999;
        var processed_chunks = [];

        var results = _.map(this.chunks, (chunk) => {
            //@TODO: use now() also

            var result = chunk.resetQuery()
                .addParams(params)
                .addParam('count', left_slots)
                .reserve();

            if (!result.slots.length) {
                processed_chunks.push(chunk);
            } else {
                processed_chunks = _.union(processed_chunks, result.parts);
            }

            left_slots -= result.slots.length;
            return result.slots;
        });

        this.chunks = processed_chunks;

        var proccessed_results = this._processResults(results);

        return proccessed_results;
    }
    returnTime(chunk) {
            //return unused time mechanics here
        }
        //@TODO: rename this! this is data to save in db
    getData() {
        var data = _.map(this.chunks, (chunk) => {
            return chunk.toJSON();
        });
        return data;
    }
    _processResults(results) {
        return results;
    }
    now() {
        return _.now();
    }

}

module.exports = Plan;