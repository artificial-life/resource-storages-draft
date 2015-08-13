'use strict'

var _ = require('lodash');
var PrimitiveVolume = require('./Classes/PrimitiveVolume.js');

class TimeChunk extends PrimitiveVolume {
    constructor(data, state = 'a') {
        super(state);
        this.transformData(data);
    }
    transformData(data) {
        if (_.isArray(data)) {
            [[this.start, this.end]] = data;
        } else {
            [this.start, this.end] = data.time.data;
        }

        return this;
    }
    static getParamsDescription() {
        return [{
            type: 'volume_definition',
            name: 'time'
        }];
    }
    addParams(params) {

    }
    addParam(key, value) {

    }
    resetQuery() {

    }
    getCutPoints() {
        var cut_start = _.max([this.start, this.filters.startTime]);
        var cut_end = _.min([this.end, this.filters.endTime]);

        return [cut_start, cut_end];
    }
    query() {
        if (this.filters.count <= 0 || this.isReserved()) return [];

        var allocated = 0;
        var slots = [];

        var [cut_start, cut_end] = this.getCutPoints();

        var length = cut_end - cut_start;

        allocated = _.min([Math.floor(length / this.filters.size), this.filters.count]);

        for (var i = 0; i < allocated; i += 1) {
            slots.push([cut_start + (i) * this.filters.size, cut_start + (i + 1) * this.filters.size]);
        }

        return slots;
    }
    reserve() {
        return '[reserved,unused]';
    }
    isReserved() {
        return this.state.isReserved();
    }
    isAvailable() {
        return this.state.isAvailable();
    }
    isNotAvailable() {
        return this.state.isNotAvailable();
    }
    getState() {
        return this.state;
    }
    toJSON() {
        return {
            data: [[this.start, this.end]],
            state: this.getState()
        };
    }
    intersection(chunk) {
        var start = _.max([this.start, chunk.start]);
        var end = _.min([this.end, chunk.end]);

        if (start >= end) return false;

        var state = this.getState().mix(chunk.getState());

        return new TimeChunk([[start, end]], state);
    }
}


module.exports = TimeChunk;