'use strict'

var _ = require('lodash');
var Parameter = require('./VolumeParameter.js');

class VolumeArrayIndex extends Parameter {
    constructor() {
        super();
        this.list = [];
        var args = Array.prototype.slice.apply(arguments);
        this.setBoundaries.apply(this, args);
    }
    isDiscrete() {
        return true;
    }
    addIndex(index) {
        this.list.push(index);
        return this;
    }
    setBoundaries(data) {
        if (!_.isArray(data)) return this;
        this.list = data;
        return this;

    }

    [Symbol.iterator]() {

        var list = this.list;
        var cursor = 0;

        return {
            next() {
                var value = list[cursor];
                cursor += 1;
                var done = cursor > list.length;
                return {
                    done: done,
                    value: value
                };
            }
        }
    }
};

module.exports = VolumeArrayIndex;