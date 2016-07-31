'use strict'

var Promise = require('bluebird');
var _ = require('lodash');

class Plan {
    constructor(data) {
        this.content = data.slice();
    }
    searchPos(value, is_start) {
        return {
            is_equal: Boolean,
            index: Number
        }
    }
    pull(start, end) {
        let start_index = this.searchPos(start, true); //position to insert
        let end_index = this.searchPos(end);
        if (start_index.is_equal) // insert or delete
            if (end_index.is_equal) // insert or delete

                return this;
    }
    intersection(plan) {
        let c1 = this.content;
        let c2 = plan.content;

        let plead = 0;
        let ploose = 0;

        let leader = c1[0] < c2[0] ? c1 : c2;
        let looser = c1[0] >= c2[0] ? c1 : c2;
        let result = [];
        let last = _.min([c1[c1.length - 1],c2[c2.length - 1]]);
        let next=true;

        while (next) {
            let s1 = leader[plead * 2];
            let e1 = leader[plead * 2 + 1];
            let s2 = looser[ploose * 2];
            let e2 = looser[ploose * 2 + 1];

            if (e1 >= last && e2 >= last) next = false;

            if (s2 < e1) {
                result.push(s2);
            } else {
              plead ++;
              s1 = leader[plead * 2];

              if (s1 >= s2){
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

        return result;
    }

}

module.exports = Plan;
