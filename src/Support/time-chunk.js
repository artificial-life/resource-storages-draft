'use strict'

class TimeChunk {
    constructor(chunk) {

    }
    observe(params) {
        //process request 
        var done = false;
        var l = result.length;

        if (typeof params.count !== 'undefined') {
            params.count -= l;
            done = params.count === 0;
        }

        return [result, done];
    }
    addParams(params) {
        _.forEach(params, (value, key) => {
            this.addParam(key, value)
        });
        return this;
    }
    addParam(key, value) {
        return this;
    }
}


module.exports = TimeChunk;