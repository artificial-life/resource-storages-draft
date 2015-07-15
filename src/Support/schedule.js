'use strict'

var _ = require('lodash');
var Volume = require('./volume.js');
var TimeChunk = require('./time-chunk.js');

class Schedule /*extends Volume*/ {
    constructor(chunk_array) {
        //super(chunk_array);

        this.chunks = [];

        _(chunk_array).forEach((item) => {
            this.chunks.push(new TimeChunk(item.chunk, item.is_filled));
        }).value();
    }
    observe(params) {
        //@TODO:avoid code duplication

        var sum_length = 0;
        var left_slots = params.count || 9999;

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
    _processResults(results) {
        return results;
    }
    now() {
        return _.now();
    }

}

module.exports = Schedule;