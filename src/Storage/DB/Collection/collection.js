'use strict'

var Abstract = require('../../Abstract/abstract.js');
var _ = require('lodash');
var TimeChunk = require('../../../Support/time-chunk.js');
var Plan = require('../../../Support/plan.js');


class DBCollection extends Abstract {
    constructor(name, range) {
        super();
        this.Volume = [];
        //test only 

        var count;
        var array = [];

        if (name == "Operator") {
            count = 5;
            array = [
                {
                    chunk: [28800000, 46800000],
                    is_filled: false
                        },
                {
                    chunk: [50400000, 64800000],
                    is_filled: false
                    }];
        } else if (name == "Service") {
            count = 3;
            array = [
                {
                    chunk: [28800000, 40000000],
                    is_filled: false
                        },
                {
                    chunk: [52400000, 60000000],
                    is_filled: false
                    }];
        } else {
            count = 5;
            array = [1, 0, 1];
        }


        for (var i = 0; i < count; i += 1) {
            if (name !== 'Skills') {
                this.Volume.push(new Plan(array));
            } else {
                this.Volume.push(array);
            }
        }

    }
    compose(params) {
        var Resource = 'Йа сделял!';

        return Resource;
    }
    observe(params = {}) {
        if (!params.range) {
            return this.Volume;
        } else {
            var [start, end] = params.range;
            //do something
        }
    }
    getVolume(params) {

    }
}

module.exports = DBCollection;