'use strict'

var _ = require('lodash');
var VolumeQuery = require('./VolumeQuery.js');
var LayerQuery = require('./LayerQuery.js');

class Query {
    constructor(params_hub) {
        return params_hub.Discrete().length ? new LayerQuery(params_hub) : new VolumeQuery(params_hub);
    }

}

module.exports = Query;