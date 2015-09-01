'use strict'

var _ = require('lodash');

class BasicQuery {
    constructor(hub, watched) {
        this.defaults = {};
        this.hub = hub;
        this.watched = this.getListParamsNames(watched);
    }
    setDefault(params) {
        this.defaults = params;
    }
    reset() {
        this.filters = _.clone(this.defaults, true);

        return this;
    }
    getContinuosParamsNames() {
        return this.getListParamsNames('continuos');
    }
    getDiscreteParamsNames() {
        return this.getListParamsNames('discrete');
    }
    getListParamsNames(list) {
        var names = this.hub.getNames(list);

        return _.transform(this.filters, (result, value, key) => {
            if (~names.indexOf(key)) result[key] = value;
        });
    }
    addParams(params) {
        _.forEach(params, (param, key) => {
            this.addParam(key, param);
        });

        return this;
    }
}

module.exports = BasicQuery;