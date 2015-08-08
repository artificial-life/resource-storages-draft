'use strict'

var Plan = require('./Support/plan.js');
var _ = require('lodash');

class IdRange {
    constructor(start, end, length) {
        if (_.isArray(start)) {
            this.is_array = true;
            this.array = start;
        } else {
            this.is_array = false;
            this.start = start;
            this.end = end;
            this.length = !length ? end - start : length;
        }
    }
    isIn(num) {
        if (!this.is_array) {
            return (num >= this.start && num <= this.end);
        } else {
            return -1 !== this.array.indexOf(num);
        }
    }
};

class VolumeParameter {
    constructor() {

    }
    isDiscrete() {
        return !this.isContinuos();
    }
    isContinuos() {
        return !this.isDescrit();
    }
}

class PlanParameter extends VolumeParameter {
    constructor() {
        super()
    }
    isDiscrete() {
        return false;
    }
}

class VolumeIndex extends VolumeParameter {
    constructor() {
        super();
        this.list = false;
        this.start = false;
        this.end = false;
        var args = Array.prototype.slice.apply(arguments);
        this.setBoundaries.apply(this, args);
    }
    isDiscrete() {
        return true;
    }
    setBoundaries(start, end) {
        if (_.isArray(start)) {
            this.list = start;
            return this;
        }
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {

        if (!this.list) {
            var counter = this.start - 1;
            var end = this.end;

            return {
                next() {
                    counter += 1;
                    var done = counter > end;
                    return {
                        done: done,
                        value: counter
                    };
                }
            };
        }

        var list = this.list;
        var cursor = 0;

        return {
            next() {
                var value = list[cursor];
                cursor += 1;
                var done = cursor > list.length;
                return {
                    done: done,
                    value: value
                };
            }
        }
    }
}

class Volume {
    constructor(params = {}) {
        this.params = {};
        this.params.discrete = [];
        this.params.continous = [];

        _.forEach(params, (param, key) => {
            if (param.isDiscrete()) {
                this.params.discrete.push({
                    key: key,
                    param: param
                });
            } else {
                this.params.continous.push({
                    key: key,
                    param: param
                });
            }
        });

        this.resetQuery();
    }
    build() {
        //Load from db
    }
    reserve(params) {
        var owner = params.owner;
        // return new Volume();
    }
    observe(params) {
        _.forEach(params, (param, key) => {
            this.addParam(key, param);
        });
        //return new Volume();
    }
    addParam(key, param) {
        if (!this.params.hasOwnProperty(key)) return this;
        this.query_params[key] = param;
        return this;
    }
    resetQuery() {
        this.query_params = {};
    }
}

class TestVolume extends Volume {
    constructor() {
        super({
            id1: new VolumeIndex(1, 10),
            time: new PlanParameter()
        });

    }
    build() {
        this.path = [];
        this._build(0);
    }
    _build(i) {
        var param = this.params.discrete[i].param;
        for (var value of param) {
            this.path[i] = value;
            if (i + 1 < this.params.discrete.length) {
                this._build(i + 1);
            } else {
                console.log(this.path);
            }
        }
    }
}

class OperatorPlans extends Volume {
    constructor() {
        super({
            id1: new VolumeIndex(1, 10),
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

class ServicePlans extends Volume {
    constructor() {
        super({
            id1: new VolumeIndex(1, 5),
            time: new PlanParameter()
        });

    }
    build() {
        //load from db here
    }

}

class CompositeVolume extends Volume {
    constructor(ingridients = {}, params = {}) {
        super();
        this.ingridients = ingredients;
        this.params = params;
    }
}

var v = new TestVolume();
//v.build();
var c = new CompositeVolume();