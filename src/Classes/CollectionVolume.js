'use strict'

var _ = require('lodash');
var Volume = require('./Volume.js');
var Plan = require('../Support/plan.js');

function LoadPlanFromDB(i) {
    return new Plan([{
            chunk: [0, 100],
            is_filled: false
        },
        {
            chunk: [200, 300],
            is_filled: false
    }]);
}

class SubVolume {
    constructor(ids, continuos_volumes) {
        this.ids = ids;
        this.volumes = continuos_volumes;
    }
    getKeys() {
        return this.ids;
    }
}

class CollectionVolume extends Volume {
    constructor() {
        super({
            index: new VolumeIndex(1, 10),
            time: new PlanParameter()
        });
        this.content = {}; //?
    }
    build() {
        //load from db here
        var i, items_count = 10;
        for (i = 0; i < items_count; i += 1) {
            var plan = LoadPlanFromDB(i);
            /*var slice = new CollectionVolume({
                content: {
                    id: i,
                    plan: plan
                }
            });*/
            this.extend(id, plan);
        }
    }
    extend(id, plan) {

    }
}

module.exports = CollectionVolume;