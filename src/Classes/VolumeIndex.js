'use strict'

var _ = require('lodash');
var Parameter = require('./VolumeParameter.js');

class VolumeIndex extends Parameter {
    constructor() {
        super();
        this.list = false;
        this.start = false;
        this.end = false;
        var args = Array.prototype.slice.apply(arguments);
        this.setBoundaries.apply(this, args);
    }
    isDiscrete() {
        return true;
    }
    setBoundaries(start, end) {
        if (_.isArray(start)) {
            this.list = start;
            return this;
        }
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {

        if (!this.list) {
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

module.exports = VolumeIndex;