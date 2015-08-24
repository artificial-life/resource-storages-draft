'use strict'

var _ = require('lodash');

var stored_types = {};

var discover = function (name) {
    if (stored_types.hasOwnProperty(name)) return stored_types[name];

    var gen_name = _.capitalize(_.camelCase(name));
    stored_types[name] = require('./' + gen_name + '.js');

    return stored_types[name];
}

class Generator {
    constructor() {}
    static create(type, action) {
        var model = discover(type);
        var generator = new model(action);

        return generator;
    }
}

module.exports = Generator;