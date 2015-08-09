'use strict'

var _ = require('lodash');
var Parameter = require('./VolumeParameter.js');

class VolumeIndex extends Parameter {
    constructor(start, end) {
        super();
        this.start = false;
        this.end = false;

        this.setBoundaries(start, end);
    }
    isDiscrete() {
        return true;
    }
    addIndex(index) {
        if (!this.start) this.start = index;
        this.end = index;

        return this;
    }
    setBoundaries(start, end) {
        if (!start || !end) return this;

        this.start = start;
        this.end = end;
        return this;
    }

    [Symbol.iterator]() {

        var counter = this.start - 1;
        var end = this.end;

        return {
            next() {
                counter += 1;
                var done = counter > end;
                return {
                    done: done,
                    value: counter
                };
            }
        };
    }
};

module.exports = VolumeIndex;