'use strict'

var _ = require('lodash');

var CompositeMultiLayer = require('./CompositeMultiLayer.js');
var Shelf = require('./Shelf.js');

class BoxMultiLayer extends CompositeMultiLayer {
    constructor(parent) {
        super(parent);
    }
    set Volume(value) {
        this.box = value.box;

        var shelf = new Shelf(this.box);
        var formula = shelf.getFormula();

        value.Volume = shelf;
        value.decoration[0].formula = formula;

        super.Volume = value;
    }
}

module.exports = BoxMultiLayer;