'use strict'

var _ = require('lodash');
var AbstractParameter = require('./VolumeParameter.js');

class PlanParameter extends AbstractParameter {
    constructor() {
        super()
    }
    isDiscrete() {
        return false;
    }
}


module.exports = PlanParameter;