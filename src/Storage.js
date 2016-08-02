'use strict'

let _ = require('lodash');
let Plan = require('./Plan.js');

class Snapshot {
	constructor(space) {
		this.landscape = {};
		_.forEach(space, data => {
			_.set(this.landscape, [data[0], data[1]], new Plan(data[2]));
		});
	}
	find(query) {
		let fields = query[1];
		let length = query[2].length;

		let result = _.reduce(this.landscape, (min, oper, index) => {
			let int = _.reduce(fields, (acc, field) => {
				let x = oper[field];
				return acc ? acc.intersection(x) : x;
			}, false);
			int = int.findSpace(length)
			return min && min.value[0] <= int[0] ? min : {
				value: int,
				index: index
			};
		}, false);

		result.fields = fields;

		return result;
	}
	place(item) {
		let fields = item.fields;
		let points = item.value;
		let index = item.index;
		let oper = this.landscape[index];

		_.forEach(fields, field => oper[field].pull(...points))
	}
}

class Storage {
	constructor() {
		this.space = [];
		this.stored_queries = [];

	}
	addSpace(...data) {
		this.space.push(data);
	}
	find(query) {
		// query = ['*', ['main', 's1'], {
		//     length: 10
		// }];
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
		let snap = new Snapshot(this.space);
		_.forEach(this.stored_queries, query => {
			let item = snap.find(query);
			snap.place(item)
		});

		return snap;
	}
}

module.exports = Storage;
