'use strict'

const default_size = 5 * 1000 * 60;
const max_count = 9999;

class TimeChunk {
    constructor(chunk) {
        [this.start, this.end] = chunk;

        this.resetQuery();
    }
    addParams(params) {
        _.forEach(params, (value, key) => {
            this.addParam(key, value)
        });
        return this;
    }
    addParam(key, value) {
        if (this.filters.hasOwnProperty(key)) {
            this.filters[key] = value;
        }
        return this;
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
    query() {
        if (this.filters.count <= 0) return false;


        if (!this.filters.size) throw new Error('Wrong size filter' + this.filters.size);

        var allocated = 0;
        var split = false;
        var slots = [];

        var cut_start = (this.filters.startTime < this.start) ? this.start : this.filters.startTime;
        var cut_end = (this.filters.endTime > this.end) ? this.end : this.filters.endTime;


        var length = cut_end - cut_start;

        allocated = Math.floor(length / this.filters.size);

        allocated = allocated > this.filters.count ? this.filters.count : allocated;

        for (var i = 1; i <= allocated; i += 1) {
            slots.push([cut_start + (i - 1) * this.filters.size, cut_start + (i) * this.filters.size]);
        }

        split = cut_start !== this.start && cut_start + allocated * this.filters.size !== this.end;

        return {
            slots: slots,
            split: split
        };
    }
}


module.exports = TimeChunk;

var tch = new TimeChunk([28800000, 46800000]);

var result = tch.addParam('startTime', 28800000)
    .addParam('endTime', 40000000)
    .addParam('size', 1000000)
    .addParam('count', 5).query();

console.log(result);