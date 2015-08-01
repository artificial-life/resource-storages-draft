'use strict'

var Promise = require('bluebird');
var _ = require('lodash');
var Volume = require('./volume.js');
var TimeChunk = require('./time-chunk.js');

class Plan /*extends Volume*/ {
    constructor(plan_id, schedule_id = null) {
        this.chunks = [];
        this._load(plan_id, schedule_id);
    }
    _load(plan_id, schedule_id) {
        if (_.isArray(plan_id)) {
            this._makeChunks(plan_id);
            this.ready = Promise.resolve(true);
            return true;
        }

        this.ready = this.getPlanFromDb(plan_id)
            .then((plan) => (plan) ? plan : this.getScheduleFromDb(schedule_id))
            .then((chunk_array) => this._makeChunks(chunk_array));

        return true;
    }
    _makeChunks(chunk_array) {
        this.chunks = _.map(chunk_array, (item) => {
            return new TimeChunk(item.chunk, item.is_filled)
        });
        return true;
    }
    getPlanFromDb(data) {

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

        if (!params.size && params.startTime && params.endTime) {
            params.size = params.endTime - params.startTime;
        }
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

        if (!params.size && params.startTime && params.endTime) {
            params.size = params.endTime - params.startTime;
        }

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
        return _.flatten(results);
    }
    now() {
        return _.now();
    }
    intersection(plan) {
        var other_chunks = plan.chunks;
        var result = [];

        _(this.chunks).forEach((chunk) => {
            _(other_chunks).forEach((second_chunk) => {
                var local_intersection = chunk.intersection(second_chunk);

                if (local_intersection) result.push(local_intersection.toJSON());
            }).value();
        }).value();
        return new Plan(result);
    }
    union(plan) {
        if (this.chunks.length == 0) return plan.copy();
        if (plan.length == 0) return this.copy();

        var f_n = this.negative();
        var s_n = plan.negative();

        return f_n.intersection(s_n).negative();
    }
    negative() {
        var start = -Infinity,
            end;
        var result = [];
        _(this.chunks).forEach((chunk, index) => {
            end = chunk.start;
            if (start != end) {
                result.push({
                    chunk: [start, end],
                    is_filled: false
                });
            }
            start = chunk.end;

        }).value();


        if (start != Infinity) {
            result.push({
                chunk: [start, Infinity],
                is_filled: false
            });
        }
        return new Plan(result);
    }
    copy() {
        var ch = _.map(this.chunks, (chunk) => chunk.toJSON());
        return new Plan(ch);
    }

}

module.exports = Plan;