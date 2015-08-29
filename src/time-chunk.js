'use strict'

var _ = require('lodash');
var PrimitiveVolume = require('./Classes/PrimitiveVolume.js');

class TimeChunk extends PrimitiveVolume {
    constructor(init_data, state = 'a') {
        super(init_data, state);
    }
    set data(description) {
        this.default = [[-Infinity, Infinity]];

        if (_.isArray(description)) {
            [[this.start, this.end]] = description.length ? description : this.default;
        } else {
            [this.start, this.end] = description.time.data;
        }

        return this;
    }
    static get params_description() {
        return [{
            type: 'volume_definition',
            name: 'time'
        }];
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
        var state = this.getState().mix(chunk.getState());

        if (start >= end || state.isNotAvailable()) return false;


        return new TimeChunk([[start, end]], state);
    }
    getLength() {
        return this.end - this.start;
    }
    split(size) {
        var length = this.getLength();

        if (size > length) return [];
        var count = length / size | 0;
        var result = [];

        for (var i = 0; i < count; i += 1) {
            result.push(new TimeChunk([[this.start + i * size, this.start + (i + 1) * size]]));
        }

        return result;
    }
}


module.exports = TimeChunk;