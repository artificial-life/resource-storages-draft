'use strict'

var Storage = require("./Storage.js");

var Layer = require("./Layer.js");
var Plan = require("./Plan.js");

var data = [
	[0, 100],
	[600, 1200]
];
var data1 = [
	[0, 100]
];
var data2 = [
	[600, 1200]
];


describe("Storage", () => {
	var tested;

	beforeEach(() => {
		tested = new Storage({});
	});

	it("#constructor", () => {
		expect(tested).to.be.an.instanceof(Storage);
	});

	describe("basic", () => {

		describe("#build", () => {
			it("extend", () => {
				let layer = new Layer();
				let plan_main = new Plan();
				let plan1 = new Plan();
				let plan2 = new Plan();

				plan_main.extend(data);
				plan1.extend(data1);
				plan2.extend(data2);

				layer.addAttribute('main', plan);
				layer.addAttribute('at1', plan);
				layer.addAttribute('at2', plan);

				let result = layer.place({
					main: [0, 10],
					at1: [0, 10]
				});
			});
		});

	});
});
