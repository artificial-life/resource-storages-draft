'use strict'

var Promise = require('bluebird');
var _ = require('lodash');
var TimeChunk = require('./time-chunk.js');
var BasicVolume = require('./Classes/BasicVolume.js');
var ZeroDimensional = require('./Classes/ZeroDimensionalVolume.js');

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
        if (!(plan.constructor.name === this.constructor.name || plan instanceof this.PrimitiveVolume)) throw new Error('Can not extract');

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
        var other_content;

        if (plan instanceof ZeroDimensional) {
            var state = plan.getContent().getState();
            var chunk = new TimeChunk([-Infinity, Infinity], state);
            other_content = [chunk];

        } else {
            other_content = plan instanceof Plan ? plan.getContent() : [plan];
        }

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