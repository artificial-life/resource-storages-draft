'use strict'

var _ = require('lodash');


class VolumeParameter {
    constructor() {

    }
    isDiscrete() {
        return !this.isContinuos();
    }
    isContinuos() {
        return !this.isDescrit();
    }
}

module.exports = VolumeParameter;