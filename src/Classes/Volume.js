'use strict'

var _ = require('lodash');

class Volume {
    constructor(params = {}) {
        this.params = {};
        this.params.discrete = [];
        this.params.continous = [];
        _.forEach(params, (param, key) => {
            if (param.isDiscrete()) {
                this.params.discrete.push({
                    key: key,
                    param: param
                });
            } else {
                this.params.continous.push({
                    key: key,
                    param: param
                });
            }
        });

        this.resetQuery();
    }
    build() {
        //Load from db
    }
    reserve(params) {
        var owner = params.owner;
        // return new Volume();
    }
    observe(params) {
        _.forEach(params, (param, key) => {
            this.addParam(key, param);
        });
        //return new Volume();
    }
    addParam(key, param) {
        if (!this.params.hasOwnProperty(key)) return this;
        this.query_params[key] = param;
        return this;
    }
    resetQuery() {
        this.query_params = {};
    }
}

module.exports = Volume;