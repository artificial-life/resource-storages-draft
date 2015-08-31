'use strict'

var BoxMultiLayer = require('./Classes/BoxMultiLayer.js');

var TimeSlotBox = require('./TimeSlot.js')

//ingredients : SeviceOperatorComposite as office_schedule
//goal: packaging into timeslot
//formula: find box parts

class BoxedSlots extends BoxMultiLayer {
    constructor(firstId, secondId, parent) {
        super(parent);

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

        this.Volume = {
            box: TimeSlotBox,
            decoration: [{
                    generator: {
                        action: (time) => {
                            return {
                                'socomposite': time
                            };
                        },
                        type: 'projection'
                    }
                }
            ]
        };

        this.init_params = [].slice.apply(arguments);
    }
}

module.exports = BoxedSlots;