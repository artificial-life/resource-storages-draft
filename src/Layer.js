'use strict'

let _ = require('lodash');

class Layer {
	constructor() {
		this.stored = [];
		this.attributes = {};
	}
	addAttribute(name, data) {
		_.set(this.attributes, name, data);
	}
	place(item) {
		let pos = _.map()
		return false;
	}
	prebuild() {
		let snapshot = this.makeSnapshot();
		let result = true;

		_.forEach(this.stored, stored => {
			result = snapshot.place(stored);
			return result;
		});

		return result;
	}
	makeSnapshot() {
		let snap = _.mapValye(this.attributes, a => a.clone())
		return snap;
	}
}


module.exports = Layer;
