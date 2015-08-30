'use strict'

var _ = require('lodash');

var PrimitiveVolume = require('./PrimitiveVolume.js');

class Box extends PrimitiveVolume {
    constructor(init_data, state = 'a') {
        super(init_data, state);

        this.sizes = ['fill this sh*t later']; // sizes of parts
    }
    set data(raw_data) {
        this.content = this.content || {};

        _.forEach(raw_data, (part) => {
            this.content[part.constructor.name] = part;
        });
    }
    signature() {
        var parts = this.constructor.parts;
        return _.map(parts, (part) => part.name)
    }
    setSizes(sizes) {
        //@TODO: store if array, reorder if object
        this.sizes = sizes;
    }
    static get parts() {
        throw new Error('Abstract box');
    }
    static get params_description() {
        var parts = this.parts;
        var description = [];

        _.forEach(parts, (part) => description.push(part.params_description));

        return _.flatten(description);
    }
    isForm() {
        var sizes_defined = true;
        var volumes_defined = false;

        return sizes_defined && !volumes_defined;
    }
    compose(parts) {
        var min = _.min(_.map(parts, (part) => part.getContent().length));
        var box_pack = [];

        for (var i = 0; i < min; i += 1) {

            var init_data = _.map(parts, (part) => {
                return part.getContent()[i];
            });

            box_pack.push(new this.constructor(init_data));
        }

        return box_pack;
    }
    makeFromSources(sources) {
        if (!this.isForm()) throw new Error('Sizes and Parts should be defined');

        var parts = _.map(sources, (source, index) => {
            var size = this.sizes[index];
            var splited = source.split(size);
            return splited;
        });

        var boxes = this.compose(parts);

        return boxes;
    }

}

module.exports = Box;