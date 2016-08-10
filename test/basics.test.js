'use strict'

var Storage = require("../src/Storage.js");

describe("Storage", () => {
  var tested;

  beforeEach(() => {
    tested = new Storage();
    tested.addSpace('oper1', 'main', [0, 100, 200, 300]);
    tested.addSpace('oper1', 's1', [0, 100, 200, 300]);
    tested.addSpace('oper2', 'main', [0, 100, 200, 300]);
    tested.addSpace('oper2', 's1', [0, 100, 200, 300]);
  });

  it("#constructor", () => {
    expect(tested).to.be.an.instanceof(Storage);
  });

  describe("basic", () => {

    describe("#>_<", () => {
      it("Q_Q", () => {
        let query = ['*', ['main', 's1'], {
          length: 10
        }]
        let result = tested.find(query);
        console.log(result);
      });
      it("-_-*", () => {
        let query = ['*', ['main', 's1'], {
          length: 10
        }]
        tested.place(query);
        tested.place(query);
        let result = tested.place(query);
        console.log(result);
        console.log(tested);
      });
      it("perf -_-*", () => {
        let query = ['*', ['main', 's1'], {
          length: 10
        }]
        for (var i = 0; i < 20; i++) {
          let result = tested.place(query);
        }
        console.log(tested);
      });
    });

  });
});
