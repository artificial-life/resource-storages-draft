'use strict'

var _ = require('lodash');
var VolumeArrayIndex = require('./VolumeArrayIndex.js');

class VolumeCompoundIndex extends VolumeArrayIndex {
    constructor(index_names, data) {
        super();
        this.list = [];
        this.setBoundaries.apply(data);
        this.names = index_names;
    }
};

module.exports = VolumeArrayIndex;