'use strict'

var Promise = require('bluebird');
var _ = require('lodash');

class Plan {
  constructor(data, not_copy) {
    this.content = !not_copy ? data.slice() : data;
  }
  searchPos(start, end) {
    let c = this.content;
    let index = -1;
    let prev = -1;
    let is_equal_start = false;
    let is_equal_end = false;

    _.forEach(c, (x, i) => {
      if (x >= start) {
        is_equal_start = x == start;
        is_equal_end = is_equal_start ? c[i + 1] == end : x == end;
        index = is_equal_start ? i : i - 1;
        return false;
      }

    });

    return {
      is_equal_start,
      is_equal_end,
      index
    }
  }
  pull(start, end) {
    // global.x = global.x ? global.x + 1 : 1;
    let pos = this.searchPos(start, end); //position to insert
    if (pos.is_equal_start && pos.is_equal_end) {
      this.content.splice(pos.index, 2);
    } else
    if (pos.is_equal_start && !pos.is_equal_end) {
      this.content[pos.index] = end;
    } else

    if (!pos.is_equal_start && pos.is_equal_end) {
      this.content[pos.index + 1] = start;
    } else

    if (!pos.is_equal_start && !pos.is_equal_end) {
      this.content.splice(pos.index + 1, 0, start, end);
    }

    return this;
  }
  intersection(plan) {
    // global._intersection = global._intersection ? global._intersection + 1 : 1;
    let c1 = this.content;
    let c2 = plan.content;

    let plead = 0;
    let ploose = 0;

    let leader = c1[0] < c2[0] ? c1 : c2;
    let looser = c1[0] >= c2[0] ? c1 : c2;

    let result = [];
    let last = _.min([c1[c1.length - 1], c2[c2.length - 1]]);
    let next = true;

    while (next) {
      let s1 = leader[plead * 2];
      let e1 = leader[plead * 2 + 1];
      let s2 = looser[ploose * 2];
      let e2 = looser[ploose * 2 + 1];

      if (e1 >= last && e2 >= last) next = false;

      if (s2 < e1) {
        result.push(s2);
      } else {
        plead++;
        s1 = leader[plead * 2];

        if (s1 >= s2) {
          let sw = looser;
          looser = leader;
          leader = sw;

          let swp = ploose;
          ploose = plead;
          plead = swp;
        }
        continue;
      }


      if (e2 > e1) {
        result.push(e1);
        let sw = looser;
        looser = leader;
        leader = sw;

        let swp = ploose;
        ploose = plead;
        plead = swp;
        ploose++;
        continue;
      }

      if (e2 <= e1) {
        result.push(e2);

        ploose++;

        continue;
      }

    }

    return new Plan(result, false);
  }
  findSpace(len) {
    let c = this.content;
    let count = c.length / 2;
    for (var i = 0; i < count; i++) {
      let s = c[i * 2];
      let e = c[i * 2 + 1];
      if (e - s >= len) return s;
    }
  }
}

module.exports = Plan;
