'use strict'

var CompositeMultiLayer = require('./Classes/CompositeMultiLayer.js');
var Shelf = require('./Classes/Shelf.js');
var TimeSlotBox = require('./TimeSlot.js')

//ingredients : SeviceOperatorComposite as office_schedule
//goal: packaging into timeslot
//formula: find box parts

class BoxedSlots extends CompositeMultiLayer {
    constructor(firstId, secondId, parent) {
        super(parent);
        this.box = TimeSlotBox;

        this.description = [{
            type: "Index",
            name: firstId,
            generator: {
                action: (index) => {
                    return {
                        'socomposite': index
                    };
                },
                type: 'projection'
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


        var shelf = new Shelf(this.box);
        var formula = shelf.getFormula();

        this.Volume = {
            Volume: shelf,
            decoration: [{
                    generator: {
                        action: (time) => {
                            return {
                                'socomposite': time
                            };
                        },
                        type: 'projection'
                    },
                    formula: formula
                }
            ]
        };

        this.init_params = [].slice.apply(arguments);
    }
}

module.exports = BoxedSlots;