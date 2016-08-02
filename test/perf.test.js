'use strict'

var Storage = require("./Storage.js");

describe.only("PERF", () => {
	var tested;

	beforeEach(() => {
		tested = new Storage();
		let oper_count = 50;
		let service_count = 50;
		let oper_plan = [0, 1000, 2000, 3000];
		let serv_plan = [0, 1000, 2000, 3000];
		for (var i = 0; i < oper_count; i++) {
			tested.addSpace('oper' + i, 'main', oper_plan);
			for (var j = 0; j < service_count; j++) {
				tested.addSpace('oper' + i, 's' + j, serv_plan);
			}
		}

	});

	it("#constructor", () => {
		expect(tested).to.be.an.instanceof(Storage);
	});

	describe("oper 50 service 200", () => {

		it("x50", () => {
			let services = ['s1', 's2', 's3', 's4'];

			for (var i = 0; i < 50; i++) {
				let service = _.sample(services);
				let query = ['*', ['main', service], {
					length: 10
				}]
				let result = tested.place(query);
			}
			// console.log(tested);
		});
		it("x100", () => {
			let services = ['s1', 's2', 's3', 's4'];

			for (var i = 0; i < 100; i++) {
				let service = _.sample(services);
				let query = ['*', ['main', service], {
					length: 10
				}]
				let result = tested.place(query);
			}
			// console.log(tested);
		});
		it("x200", () => {
			let services = ['s1', 's2', 's3', 's4'];

			for (var i = 0; i < 200; i++) {
				let service = _.sample(services);
				let query = ['*', ['main', service], {
					length: 10
				}]
				let result = tested.place(query);
			}
			// console.log(tested);
		});

	});
});
