'use strict'

var Plan = require("./Plan.js");



describe("Plan", () => {
    var tested;

    beforeEach(() => {
        let data = [0, 100, 200, 350];
        tested = new Plan(data);
    });

    it("#constructor", () => {
        expect(tested).to.be.an.instanceof(Plan);
    });

    describe("basic", () => {

        describe("#intersection", () => {
            it("extend", () => {
                let data2 = [10, 210];
                let tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
                data2 = [100, 210];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
                data2 = [110, 210];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));

                data2 = [0, 100, 200, 300];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
                data2 = [-10, 100, 200, 300];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
                data2 = [10, 90, 200, 300];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
                data2 = [-10, 500];
                tplan = new Plan(data2);

                console.log(tested.intersection(tplan));
            });
            it('#perf', () => {
                for (var i = 0; i < 1000000; i++) {
                    let data2 = [10, 90, 200, 300];
                    let tplan = new Plan(data2);
                    let x = tested.intersection(tplan)
                }
            })
            it('#perf', () => {
                let data2 = _.range(20);
                for (var i = 0; i < 1000000; i++) {

                    let tplan = new Plan(data2);
                    let x = tested.intersection(tplan)
                }
            })
            it('pos', () => {
                console.log(tested.searchPos(201,250));
                console.log(tested.searchPos(201,300));
                console.log(tested.searchPos(0,100));
            })
            it('pull', () => {
                console.log(tested.pull(201,250).content);
            })
            it('pull', () => {
                console.log(tested.pull(201,300).content);
            })
            it('pull', () => {
                console.log(tested.pull(0,100).content);
            })
            it('pull', () => {
                console.log(tested.pull(0,10).content);
            })
            it('pull', () => {
                console.log(tested.pull(200,210).content);
            })
            it('pull', () => {
                console.log(tested.findSpace(110));
            })
        });

    });
});
