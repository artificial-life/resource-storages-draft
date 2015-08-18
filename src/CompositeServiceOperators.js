'use strict'

var _ = require('lodash');

var CompositeVolume = require('./Classes/CompositeVolume.js');
var Plan = require('./Plan.js');

class SOComposite extends CompositeVolume {
    constructor(firstId, secondId, parent) {
        super([{
            type: "Index",
            name: firstId,
            projection: (index) => {
                return {
                    'operators': index,
                    'skills': index
                };
            }
            }, {
            type: "Index",
            name: secondId,
            projection: (index) => {
                return {
                    'services': index,
                    'skills': index
                };
            }
            }], Plan, parent);

        var projection_fn = {};

        projection_fn['volume'] = (time) => {
            return {
                'operators': time,
                'services': time
            };
        };

        this.projection = projection_fn;

        var formula = (operator_volume, service_volume, skill) => {
            return operator_volume.intersection(service_volume).intersection(skill);
        };

        this.setFormula(formula);
    }
    setIngredients(operators, services, skills) {
        this.ingredients = {};
        this.ingredients.operators = operators;
        this.ingredients.services = services;
        this.ingredients.skills = skills;
    }
    observe(params) {

        this.query.reset()
            .addParams(params).filter((id) => {
                console.log('cons', id);
            });
    }
}

module.exports = SOComposite;