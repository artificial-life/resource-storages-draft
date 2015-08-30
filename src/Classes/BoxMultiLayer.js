'use strict'

var _ = require('lodash');

var CompositeMultiLayer = require('./CompositeMultiLayer.js');
var BoxQuery = require('./Query/BoxQuery.js');

class BoxMultiLayer extends CompositeMultiLayer {
    constructor(parent) {
        super(parent);
    }
    attachQuery() {
        //@TODO:rework it later
        this.query = new BoxQuery(this.box, this.getParams());
    }
}

module.exports = BoxMultiLayer;