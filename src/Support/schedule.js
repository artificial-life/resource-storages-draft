'use strict'

var _ = require('lodash');
var Volume = require('./volume.js');
var TimeChunk = require('./time-chunk.js');

class Schedule extends Volume {
    constructor(chunk_array) {
        super(chunk_array);

        this.chunks = [];

        _(chunk_array).forEach((chunk) => {
            this.chunks.push(new TimeChunk(chunk));
        }).value();

    }
    observe(params) {
        var sum_length = 0;
        var left_slots = params.count || 9999;

        var results = _.map(this.chunks, (chunk) => {

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
    _processResults(results) {
        return results;
    }
}

module.exports = Schedule;