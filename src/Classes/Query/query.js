'use strict'

var _ = require('lodash');

class Query {
    constructor(params_hub, default_params = {}) {
        this.hub = params_hub;
        this.defaults = default_params;
        this.reset();
    }
    hasParam(param) {
        return this.hub.hasParam(param);
    }
    reset() {
        this.filters = _.clone(this.defaults, true);
        return this;
    }
    addParams(params) {
        _.forEach(params, (param, key) => {
            console.log(param, key);
        });

        return this;
    }
    addParam(key, value) {
        var data = {};
        data[key] = value;

        return this.addParams(data);
    }
    execute() {

    }
}

module.exports = Query;