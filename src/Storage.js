'use strict'

let _ = require('lodash');
let Plan = require('./Plan.js');

let ops = _.map(_.range(50), o => 'oper' + o);
let land = Object.create(null);
_.forEach(ops, op => {
  land[op] = {};
});
let prev = false;

class Snapshot {
  constructor(space) {
    this.landscape = _.clone(land);

    _.forEach(space, data => {
      let attr = data[1] == 'main' ? false : data[2];
      this.landscape[data[0]][data[1]] = attr;
    });
  }
  rebuild(mains) {
    _.forEach(mains, data => {
      let attr = new Plan(data[2]);
      this.landscape[data[0]][data[1]] = attr;
    });
  }
  find(query) {
    let fields = query[1];
    let length = query[2].length;

    let result = _.reduce(this.landscape, (min, oper, index) => {
      let pos = this.findIn(oper, fields, length);

      if (min.value > pos) {
        min.value = pos;
        min.index = index;
      }

      return min;
    }, {
      value: 100000,
      index: -1
    });

    result.fields = fields;
    result.length = length;
    return result;
  }
  findIn(places, fields, length) {
    let result = _.reduce(fields, (min, field) => {
      let place = places[field].content;
      let i;

      for (i = 0; i < place.length / 2; i++) {
        let point = place[i * 2];

        if (point >= min) return min;

        if (this.testPoint(places, fields, point, length)) return min <= point ? min : point;
      }

      return min;
    }, 1000000);

    return result;
  }
  testPoint(places, fields, point, length) {
    let result = true;
    _.forEach(fields, field => result = this.chunkInPlace(places[field].content, point, length));
    return result;
  }
  chunkInPlace(place, start_point, length) {
    let result = false;
    let end_point = start_point + length;
    _.forEach(place, (p, index) => {
      if (p < end_point) return true;

      if (!index % 2) return false; //not end of chunk - return false

      if (place[index - 1] <= start_point) result = true;

      return false;
    });

    return result;
  }
  place(item) {
    let fields = item.fields;
    let point = item.value;
    let length = item.length;
    let index = item.index;
    let oper = this.landscape[index];
    oper.main.pull(point, point + length);
  }
}

class Storage {
  constructor() {
    this.space = [];
    this.stored_queries = [];
    this.last_time = 0;
    this.snap_time = 0;
    this.mains = [];
  }
  addSpace(...data) {
    let attr = data[1] == 'main' ? data[2] : new Plan(data[2])
    if (data[1] == 'main') this.mains.push(data);
    this.space.push([data[0], data[1], attr]);
  }
  find(query) {
    let snap = this.buildSnapshot();
    return snap.find(query);
  }
  place(query) {
    let snap = this.buildSnapshot();
    let result = snap.find(query);
    if (result) {
      snap.place(result);
      this.stored_queries.push(query);
    }

    return result;
  }
  buildSnapshot() {
    // if (this.snap) return this.snap;

    let time = process.hrtime();
    let snap = this.snap || new Snapshot(this.space);
    this.snap = snap;
    snap.rebuild(this.mains);
    let diff = process.hrtime(time);
    this.snap_time = this.snap_time + diff[0] * 1e9 + diff[1];

    time = process.hrtime();
    _.forEach(this.stored_queries, query => {
      let item = snap.find(query);
      snap.place(item)
    });

    diff = process.hrtime(time);
    this.last_time = this.last_time + diff[0] * 1e9 + diff[1];

    return snap;
  }
}

module.exports = Storage;
