'use strict'

var PrimitiveVolume = require('./PrimitiveVolume.js');

class Box extends PrimitiveVolume {
    constructor(init_data, state = 'a') {
        super(init_data, state);

        this.parts = []; //PrimitiveVolumes
        this.sizes = ['fill this sh*t later']; // sizes of parts
    }
    static get parameters_description() {

    }
    isForm() {
        var sizes_defined = true;
        var volumes_defined = false;

        return sizes_defined && !volumes_defined;
    }
    generateId() {
        return Math.random();
    }
    compose(parts) {
        var min = _.min(_.map(parts, (part) => part.length));
        var box_map = {};
        for (var i = 0; i < min; i += 1) {
            var id = this.generateId();
            var init_data = _.map(parts, (part) => part[i].toJSON());

            box_map[id] = new this.constructor(init_data);
        }

        return box_map;
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