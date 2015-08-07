'use strict'

var Plan = require('./Support/plan.js');
var _ = require('lodash');
class IdRange {
    constructor(start, end, length) {
        if (_.isArray(start)) {
            this.is_array = true;
            this.array = start;
        } else {
            this.is_array = false;
            this.start = start;
            this.end = end;
            this.length = !length ? end - start : length;
        }
    }
    isIn(num) {
        if (!this.is_array) {
            return (num >= this.start && num <= this.end);
        } else {
            return -1 !== this.array.indexOf(num);
        }
    }
};

class Volume {
    constructor() {
        this.params = {
            'id': {
                type: Number,
                start: 0,
                end: null
            },
            'time': {
                type: Plan,
                start: 0,
                end: 24 * 60 * 60 * 1000
            }
        };
        this.resetQuery();
    }
    build() {
        //Load from db
    }
    reserve(params) {
        var owner = params.owner;
        return new Volume();
    }
    observe(params) {
        _.forEach(params, (param, key) => {
            this.addParam(key, param);
        });
        return new Volume();
    }
    addParam(key, param) {
        if (!this.params.hasOwnProperty(key)) return this;
        this.query_params[key] = param;
        return this;
    }
    resetQuery() {
        this.query_params = {};
    }
}