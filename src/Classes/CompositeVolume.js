'use strict'

var _ = require('lodash');
var Volume = require('./Volume.js');


class CompositeVolume extends Volume {
    constructor(ingridients = {}, params = {}) {
        super();
        this.ingridients = ingredients;
        this.params = params;
    }
}

module.exports = CompositeVolume;