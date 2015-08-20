'use strict'

var _ = require('lodash');

var CompositeMultiLayer = require('./Classes/CompositeMultiLayer.js');
var ProjectionDescription = require('./Classes/ProjectionDescription.js');
var Plan = require('./Plan.js');

class SOComposite extends CompositeMultiLayer {
    constructor(firstId, secondId, parent) {

        var projection_description = new ProjectionDescription(Plan, (time) => {
            return {
                'operators': time,
                'services': time
            };
        }, ([operator_volume, service_volume, skill]) => {
            if (!operator_volume || !service_volume || !skill) return false;

            return operator_volume.intersection(service_volume).intersection(skill);
        });

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
            }], projection_description, parent);


        this.init_params = [].slice.apply(arguments);
    }
    setIngredients(operators, services, skills) {
        this.ingredients = {};
        this.ingredients.operators = operators;
        this.ingredients.services = services;
        this.ingredients.skills = skills;
    }


}

module.exports = SOComposite;