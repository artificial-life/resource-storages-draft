'use strict'

var _ = require('lodash');
var Volume = require('./Volume.js');

class CollectionVolume extends Volume {
    constructor() {
        super({
            index: new VolumeIndex(1, 10),
            time: new PlanParameter()
        });

    }
    build() {
        //load from db here
        var i, items_count = 10;
        for (i = 0; i < items_count; i += 1) {
            var plan = LoadPlanFromDB(i);
            var slice = new CollectionVolume({
                content: {
                    id: i,
                    plan: plan
                }
            });
        }
    }
    extend(slice) {

    }
}

module.exports = CollectionVolume;