'use strict'

var Promise = require('bluebird');
var _ = require('lodash');
var TimeChunk = require('./time-chunk.js');
var BasicVolume = require('./Classes/BasicVolume.js');

class Plan extends BasicVolume {
    constructor(parent) {
        super(Plan.getPrimitiveVolumeType(), parent);
    }
    static getPrimitiveVolumeType() {
        return TimeChunk;
    }
    build(data) {
        //build from state 
        //build form primitive
        if (data instanceof this.PrimitiveVolume) {
            this.extend(data, false);
            return this;
        }

        if (!_.isArray(data)) return this;
        //build from array

        _.forEach(data, (raw_data) => {
            var primitive_volume = this.buildPrimitiveVolume(raw_data);
            this.extend(primitive_volume, false);
        });

        return this;
    }
    extend(plan, sort = true) {
        var ext = this.extractContent(plan);

        _.forEach(ext, (primitive) => {
            this.extendPrimitive(primitive);
        });

        if (sort) this.sort();

        return this;

    }
    extractContent(plan) {
        if (!(plan instanceof Plan || plan instanceof this.PrimitiveVolume)) throw new Error('Can not extract');

        return plan instanceof Plan ? plan.getContent() : [plan];
    }
    sort() {
        this.content = _.sortBy(this.content, function (chunk) {
            return this.start;
        });
    }
    observe(params) {
        //data has [start,end]
        return this.query.reset().addParams(params).filter(this);
    }
    reserve(params) {
        //@TODO:avoid code duplication
        /*
                var sum_length = 0;
                var left_slots = params.count || 9999;
                var processed_chunks = [];

                if (!params.size && params.startTime && params.endTime) {
                    params.size = params.endTime - params.startTime;
                }

                var results = _.map(this.content, (chunk) => {
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

                this.content = processed_chunks;

                var proccessed_results = this._processResults(results);

                return proccessed_results;*/
    }
    getData() {
        var data = _.map(this.content, (chunk) => {
            return chunk.toJSON();
        });
        return data;
    }
    _processResults(results) {
        return _.flatten(results);
    }
    intersection(plan) {
        var other_content = plan instanceof Plan ? plan.getContent() : [plan];
        var result = [];

        _(this.getContent()).forEach((chunk) => {
            _(other_content).forEach((second_chunk) => {
                var local_intersection = chunk.intersection(second_chunk);
                if (local_intersection) result.push(local_intersection);
            }).value();
        }).value();

        var plan = new Plan(this);
        plan.build(result);

        return plan;
    }
    union(plan) {
        if (this.content.length == 0) return plan.copy();
        if (plan.content.length == 0) return this.copy();

        var f_n = this.negative();
        var s_n = plan.negative();

        return f_n.intersection(s_n).negative();
    }
    negative() {
        var start = -Infinity,
            end;
        var result = [];

        _(this.content).forEach((chunk, index) => {
            end = chunk.start;
            if (start != end) {
                result.push({
                    data: [[start, end]],
                    state: 'a'
                });
            }
            start = chunk.end;

        }).value();


        if (start != Infinity) {
            result.push({
                data: [[start, Infinity]],
                state: 'a'
            });
        }
        var plan = new Plan(this);
        plan.build(result);

        return plan;
    }
    copy() {
        var ch = _.map(this.content, (chunk) => chunk.toJSON());
        return new Plan(ch);
    }
}

module.exports = Plan;