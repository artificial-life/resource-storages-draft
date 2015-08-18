'use strict'

var _ = require('lodash');

var LayerQuery = require('./LayerQuery.js');

class CompositeQuery extends LayerQuery {
    constructor(params_hub) {
        super(params_hub);
    }
    filter(callback) {
        this.names = [];

        for (var name in this.filters) {
            this.names.push(name)
        }

        this.buildFilter(0, {}, callback);
    }
    buildFilter(depth, path, callback) {
        var name = this.names[depth];
        var key = this.filters[name];
        for (var value of key) {
            path[name] = value;

            if (depth + 1 < this.names.length) {
                this.buildFilter(depth + 1, path, callback);
            } else {
                callback(this.hub.project(path));
            }
        }
    }

}

module.exports = CompositeQuery;