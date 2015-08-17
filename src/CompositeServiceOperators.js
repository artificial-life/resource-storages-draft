'use strict'

var CompositeVolume = require('./Classes/CompositeVolume.js');
var Plan = require('./Plan.js');

class SOComposite extends CompositeVolume {
    constructor(firstId, secondId, parent) {
        super([{
            type: "Index",
            name: firstId
            }, {
            type: "Index",
            name: secondId
            }], Plan, parent);

        var projection = {
            firstId: [{
                'operator_id': 'linear'
            }],
            secondId: [{
                'service_id': 'linear'
            }],
            volume: [{
                action: 'intersection'
            }]
        }
    }
    setIngredients(operators, services, skills) {
        this.operators = operators;
        this.services = services;
        this.skills = skills;
    }
    setFormula(formula) {
        this.formula = formula;
    }
}

module.exports = SOComposite;