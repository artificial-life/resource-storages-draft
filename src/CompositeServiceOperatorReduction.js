'use strict'

var CompositeMultiLayer = require('./Classes/CompositeMultiLayer.js');
var Plan = require('./Plan.js');

//WOW!
//@
//SO COMPOSITE!
//@
//SUCH REDUCED!

class SOCompositeReduction extends CompositeMultiLayer {
    constructor(firstId, secondId, parent) {
        super(parent);
        this.description = [{
            type: "Index",
            name: firstId,
            generator: {
                action: (context) => {
                    var second = secondId;
                    return {
                        'socomposite': context[second]
                    };
                },
                type: 'functional reduction'
            }
            }, {
            type: "Index",
            name: secondId,
            generator: {
                action: (index) => {
                    return {
                        'socomposite': index
                    };
                },
                type: 'projection'
            }
            }];

        this.Volume = {
            Volume: new Plan(),
            decoration: [{
                generator: {
                    action: (time) => {
                        return {
                            'socomposite': time
                        };
                    },
                    type: 'projection'
                },
                formula: ([reduced]) => reduced

            }]
        };

        this.init_params = [].slice.apply(arguments);
    }

}

module.exports = SOCompositeReduction;