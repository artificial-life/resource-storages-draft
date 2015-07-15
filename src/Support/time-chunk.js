'use strict'

var _ = require('lodash');

const default_size = 5 * 1000 * 60;
const max_count = 9999;

class TimeChunk {
    constructor(chunk) {
        [this.base_start, this.base_end] = chunk;
        [this.start, this.end] = chunk;

        this.resetQuery();
    }
    addParams(params) {
        _.assign(this.filters, params);
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
        var cut_start = (this.filters.startTime < this.start) ? this.start : this.filters.startTime;
        var cut_end = (this.filters.endTime > this.end) ? this.end : this.filters.endTime;

        return [cut_start, cut_end];
    }
    query() {
        if (this.filters.count <= 0) return false;


        if (!this.filters.size) throw new Error('Wrong size filter' + this.filters.size);

        var allocated = 0;
        var slots = [];

        var [cut_start, cut_end] = this.getCutPoints();

        var length = cut_end - cut_start;

        allocated = Math.floor(length / this.filters.size);

        allocated = allocated > this.filters.count ? this.filters.count : allocated;

        for (var i = 1; i <= allocated; i += 1) {
            slots.push([cut_start + (i - 1) * this.filters.size, cut_start + (i) * this.filters.size]);
        }

        return slots;
    }
    reserve() {
        var slots = this.query();
        var [cut_start, ] = this.getCutPoints();

        var split = false;
        var allocated = slots.length;

        if (!allocated) return slots;

        split = cut_start !== this.start && ((cut_start + allocated * this.filters.size) !== this.end);

        if (split) {
            //@TODO: do something T_T
        }
        if (cut_start === this.start && ((cut_start + allocated * this.filters.size) !== this.end)) {
            this.start = cut_start + allocated * this.filters.size;
        }

        if ((cut_start + allocated * this.filters.size) === this.end) {
            this.end = cut_start;
        }
        console.log(this.start, this.end);

        return slots;
    }
    returnPart(chunk) {

    }

}


module.exports = TimeChunk;