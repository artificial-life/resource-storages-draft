'use strict'

var _ = require('lodash');

var State = require('./State.js');
var BasicVolume = require('./BasicVolume.js');

class PrimitiveVolume {
    constructor(state, owner = false) {
        if (_.isString(state)) {
            this.state = new State(state, owner);
        } else if (state instanceof State) {
            this.state = state;
        }
    }
}

module.exports = PrimitiveVolume;