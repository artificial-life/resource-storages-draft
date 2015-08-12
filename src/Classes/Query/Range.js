'use sctrict'
var _ = require('lodash');

class Range {
    constructor(data) {
        this.array = false;
        this.start = -Infinity;
        this.end = Infinity;
        if (_.isNumber(data)) this.buildFromArray([data]);
        if (_.isArray(data)) this.buildFromArray(data);
        if (_.isObject(data)) this.buildFromObject(data);
    }
    buildFromArray(array) {
        this.array = array;
        return this;
    }
    buildFromObject(object) {

        ({
            start: this.start,
            end: this.end
        } = object);

        return this;
    }
    inRange(n) {
        return this.array ? this.array.indexOf(n) !== -1 : _.inRange(n, this.start, this.end);
    }
}

module.exports = Range;