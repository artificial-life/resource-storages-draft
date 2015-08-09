'use strict'

var _ = require('lodash');
var Volume = require('./Volume.js');
var VolumeParamHub = require('./VolumeParametersHub.js');

class TestVolume extends Volume {
    constructor() {
        super({
            id1: new VolumeIndex(1, 10),
            time: new PlanParameter()
        });
        this.parameters = new VolumeParamHub();
    }
    build() {
        this.path = [];
        //this._build(0);
        this.parameters.forEach((params, slice) => {
            console.log('volume slices');
        });
    }
    _build(i) {
        var param = this.params.discrete[i].param;
        for (var value of param) {
            this.path[i] = value;
            if (i + 1 < this.params.discrete.length) {
                this._build(i + 1);
            } else {
                console.log(this.path);
            }
        }
    }
}

module.exports = TestVolume;