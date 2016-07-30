'use strict'

let _ = require('lodash');

class Snapshot {
    constructor(data) {
        this.attributes = data;
    }
    place(item) {
        let result = true;
        _.forEach(item, (part, name) => {
            result = this.attributes[name].place(part);
            return result;
        })

        return result;
    }
    find(condition) {
        let names = condition.on;
        let value = condition.value;

        let result = false;

        _.forEach(names, name => {
            let attr = this.attributes[name];
            result = !!result ? result.intersection(attr) : attr;
        })
        let pos = result.width(value);
        if (!pos) return false;

        let item = _.transform(names, (acc, name) => {
            acc[name] = pos;
        }, {});
        return item;
    }
}

class Layer {
    constructor() {
        this.stored = [];
        this.attributes = {};
    }
    addAttribute(name, data) {
        _.set(this.attributes, name, data);
    }
    place(condition) {
        let prebuild = this.prebuild();
        let item = prebuild.find(condition);
        if (item) {
            prebuild.place(item);
            this.stored.push(item);
						console.log(this.stored);
						console.log(prebuild.attributes.main);
            return true;
        }
        return false;
    }
    prebuild() {
        let snapshot = this.makeSnapshot();
        let result = true;

        _.forEach(this.stored, stored => {
            result = snapshot.place(stored);
            return result;
        });

        return snapshot;
    }
    makeSnapshot() {
        let snap = new Snapshot(_.mapValues(this.attributes, a => a.clone()))

console.log(snap.attributes.main.content);
        return snap;
    }
}


module.exports = Layer;
