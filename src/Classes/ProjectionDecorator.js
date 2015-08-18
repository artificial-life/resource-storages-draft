'use strict'

var BasicVolume = require('./BasicVolume.js');

class ProjectionDecorator extends BasicVolume {
    constructor(DecoratedVolume, projection, formula) {
        this.decorated = new DecoratedVolume();
        this.projection = projection;
        this.formula = formula;
    }
}

module.exports = ProjectionDecorator