'use strict'

var _ = require('lodash');

var PrimitiveVolume = require('./PrimitiveVolume.js');

class Box extends PrimitiveVolume {
    constructor(init_data, state = 'a') {
        super(init_data, state);
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
    static get parts() {
        throw new Error('Abstract box');
    }
    static get params_description() {
        var parts = this.parts;
        var description = [];

        _.forEach(parts, (part) => description.push(part.params_description));

        return _.flatten(description);
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
}

module.exports = Box;