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
    observe(params) {
        var result = this.emptyCopy();

        this.query.reset()
            .addParams(params).filter(this.ingredients, (key, composed) => {
                var layer = this.buildLayer(key, composed);
                result.extend(layer);
            });

        return result;
    }
}

module.exports = BoxMultiLayer;