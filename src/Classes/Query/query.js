'use strict'

var _ = require('lodash');
var VolumeQuery = require('./VolumeQuery.js');
var LayerQuery = require('./LayerQuery.js');
var CompositeQuery = require('./CompositeQuery.js');

class Query {

    static create(params_hub) {
        if (params_hub.Discrete().length) {
            return !!params_hub.composite ? new CompositeQuery(params_hub) : new LayerQuery(params_hub);
        } else {
            return new VolumeQuery(params_hub);
        }
    }
};


module.exports = Query;