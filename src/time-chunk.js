'use strict'

var _ = require('lodash');
var PrimitiveVolume = require('./Classes/PrimitiveVolume.js');

const default_size = 5 * 1000 * 60;
const max_count = 9999;

class TimeChunk extends PrimitiveVolume {
    constructor(data, state = 'a') {
        super(state);
        [this.start, this.end] = data;
        this.resetQuery();
    }
    static getParamsDescription() {
        return [{
            type: 'volume_definition',
            name: 'time'
        }];
    }
    addParams(params) {
        _.assign(this.filters, params);

        if (!this.filters.size) throw new Error('Wrong size filter' + this.filters.size);
        return this;
    }
    addParam(key, value) {
        var data = {};
        data[key] = value;

        return this.addParams(data);
    }
    resetQuery() {
        this.filters = {
            size: default_size,
            count: max_count,
            startTime: this.start,
            endTime: this.end
        };

        return this;
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
        var slots = this.query();
        var allocated = slots.length;
        var parts = [];

        var [cut_start, ] = this.getCutPoints();

        if (!allocated) return {
            slots: []
        };

        var cut_end = cut_start + allocated * this.filters.size;

        if (cut_start !== this.start) {
            parts.push(new TimeChunk([this.start, cut_start]));
        }

        parts.push(new TimeChunk([cut_start, cut_end], true));

        if (this.end !== cut_end) {
            parts.push(new TimeChunk([cut_end, this.end]));
        }

        return {
            slots: slots,
            parts: parts
        };
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
            data: [this.start, this.end],
            state: this.getState()
        };
    }
    intersection(chunk) {
        var start = _.max([this.start, chunk.start]);
        var end = _.min([this.end, chunk.end]);

        if (start >= end) return false;

        var state = this.getState().mix(chunk.getState());

        return new TimeChunk([start, end], state);
    }
}


module.exports = TimeChunk;