'use strict'

var _ = require('lodash');

var BasicVolume = require('./BasicVolume.js');
var uuid = require('node-uuid');

class Shelf extends BasicVolume {
    constructor(Box, parent) {
        super(parent);

        this.description = Box.params_description;
        this.PrimitiveVolume = Box;
        this.content = {};
    }
    extendPrimitive(primitive) {
        var id = uuid.v1();
        this.content[id] = primitive;

        return this;
    }
    getFormula() {
        var box = new this.PrimitiveVolume();

        return (parts) => {
            if (!parts) return false;
            return box.makeFromSources(parts);
        };
    }
    clone(parent) {
        return new Shelf(this.PrimitiveVolume, parent);
    }
    observe(params) {
        throw new Error('Should write it later');
    }
    sort() {
        //Wanna sort a map
        //okay
        //go on 
        return this;
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
        var ch = _.map(this.content, (chunk) => chunk);
        var shelf = new Shelf(this);
        shelf.build(ch);

        return shelf;
    }
}

module.exports = Shelf;