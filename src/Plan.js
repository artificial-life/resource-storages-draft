'use strict'

var Promise = require('bluebird');
var _ = require('lodash');

class Plan {
    constructor() {
        this.content = [];
        this.stored = [];
    }
    extend(data) {
        this.content = data;
    }
    clone() {
        let p = new Plan();
        p.extend(_.clone(this.content));
        return p;
    }
    place(item) {
        let target = _.find(this.content, chunk => this.contains(chunk, item));

        if (!target) return false;

        let result = this.split(target, item);
        _.remove(this.content, target);
        this.content = this.content.concat( this.result);
        this.stored.push(item);

        return true;
    }
    contains(chunk, item) {
        return chunk[0] <= item[0] && chunk[1] >= item[1];
    }
    split(chunk, item) {
        let first = chunk[0] == item[0] ? false : [chunk[0], item[0]];
        let last = chunk[1] == item[1] ? false : [item[1], chunk[1]];
        let result = [];
        if (first) result.push(first);
        if (last) result.push(last);

        return result;
    }
    chunkIntersection(first, second) {
        var start = _.max([first[0], second[0]]);
        var end = _.min([first[1], second[1]]);

        if (start >= end) return false;

        return [start, end];
    }
    intersection(plan) {
        let first = this.content;
        let second = plan.content;
        let content = [];

        _.forEach(first, fc => {
            _.forEach(second, sc => {
                let int = this.chunkIntersection(fc, sc);

                int && content.push(int);
            })
        });

        let p = new Plan();
        p.extend(content);

        return p;
    }
    width(value) {
        let target = _.find(this.content, chunk => (chunk[1] - chunk[0] >= value));

        return !!target ? [target[0], target[0] + value] : false;
    }
}

module.exports = Plan;
