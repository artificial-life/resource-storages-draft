'use strict'

var Promise = require('bluebird');
var _ = require('lodash');

class Plan {
	constructor() {
		this.content = [];
	}
	extend(data) {
		this.content = [];
	}
	clone() {
		let p = new Plan();
		p.extend(_.clone(this.content));
		return p;
	}
}

module.exports = Plan;
