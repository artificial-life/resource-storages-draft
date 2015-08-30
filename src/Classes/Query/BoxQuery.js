'use strict'

var _ = require('lodash');

var CompositeQuery = require('./CompositeQuery.js');

class BoxQuery extends CompositeQuery {
    constructor(box, params_hub) {
        super(params_hub);
        this.box = new box();
    }
    getFormula() {
        var sizes = _.pluck(this.continuos_filters, 'size');
        this.box.setSizes(sizes);
        return (parts) => {
            if (!parts) return false;
            return this.box.makeFromSources(parts);
        };
    }
}

module.exports = BoxQuery;