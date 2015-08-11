'use strict'

var Promise = require('bluebird');
var _ = require('lodash');
var TimeChunk = require('./time-chunk.js');
var BasicVolume = require('./Classes/BasicVolume.js');

class Plan extends BasicVolume {
    constructor(parameters_description, parent) {
        super(parameters_description, parent);
        this.primitiveVolume = TimeChunk;
        this.content = [];
    }
    build(data) {
        if (!_.isArray(data)) return this;

        //build from array
        //build from |V|=0
        _.forEach(data, (raw_data) => {
            var continuos_volume = buildPrimitiveVolume(raw_data);
            this.extend(continuos_volume, false);
        });


        return this;
    }
    buildPrimitiveVolume(item) {
        return new this.primitiveVolume(item.data, item.state);
    }
    extend(plan, sort = true) {
        var ext = [];

        if (plan instanceof Plan) {
            ext = plan.content;
        } else
        if (plan instanceof this.primitiveVolume) {
            ext = [plan];
        }

        _.forEach(ext, (primitive) => {
            extendPrimitive(primitive);
        });

        if (sort) this.sort();

        return this;

    }
    extendPrimitive(primitive) {
        return this.content.push(primitive);
    }
    sort() {
        this.content = _.sortBy(this.content, function (chunk) {
            return this.start;
        });
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
    getData() {
        var data = _.map(this.chunks, (chunk) => {
            return chunk.toJSON();
        });
        return data;
    }
    _processResults(results) {
        return _.flatten(results);
    }
    intersection(plan) {
        var other_content = plan instanceof Plan ? plan.content : [plan];
        var result = [];

        _(this.content).forEach((chunk) => {
            _(other_content).forEach((second_chunk) => {
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