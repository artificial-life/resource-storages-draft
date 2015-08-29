'use strict'

var BasicVolume = require('./BasicVolume.js');

class Shelf extends BasicVolume {
    constructor(Box, parent) {
        super(parent);

        this.description = Box.params_description;
        this.PrimitiveVolume = Box;
    }
    clone(parent) {
        return new Shelf(this.PrimitiveVolume, parent);
    }
    observe() {

    }
    sort() {
        this.content = _.sortBy(this.content, function (chunk) {
            return this.start;
        });
    }

    reserve(params) {

    }
    getData() {
        var data = '';
        return data;
    }
    intersection(data) {
        throw new Error('Method unavailable');
    }
    union(shelf) {
        throw new Error('Dunno how it should work');
    }
    negative() {
        throw new Error('Method unavailable');
    }
    copy() {
        var ch = _.map(this.content, (chunk) => chunk.toJSON());
        var shelf = new Shelf(this);
        shelf.build(ch);

        return shelf;
    }
}

module.exports = Shelf;