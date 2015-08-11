'use strict'

var _ = require('lodash');

const default_size = 5 * 1000 * 60;
const max_count = 9999;

class TimeChunk {
    constructor(chunk, filled = false) {
        [this.start, this.end] = chunk;

        this.is_filled = filled;

        this.resetQuery();
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
        if (this.filters.count <= 0 || this.isFilled()) return [];

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
    isFilled() {
        return this.is_filled;
    }
    toJSON() {
        return {
            chunk: [this.start, this.end],
            is_filled: this.isFilled()
        };
    }
    intersection(chunk) {
        var start = _.max([this.start, chunk.start]);
        var end = _.min([this.end, chunk.end]);
        if (start >= end) return false;

        var is_filled = this.isFilled() || chunk.isFilled();

        return new TimeChunk([start, end], is_filled);
    }
    union(chunk) {
        return;
    }
}


module.exports = TimeChunk;