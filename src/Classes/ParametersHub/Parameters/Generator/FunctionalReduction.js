'use strict'


var Reduction = require('./Reduction.js');

class FunctionalReduction extends Reduction {
    getAction() {
        return this.action;
    }
}

module.exports = FunctionalReduction;