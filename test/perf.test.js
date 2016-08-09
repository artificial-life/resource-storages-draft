'use strict'

var Storage = require("./Storage.js");

describe.only("PERF", () => {
  var tested;
  let oper_count = 50;
  let service_count = 200;
  beforeEach(() => {
    tested = new Storage();

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

  describe(`oper ${oper_count} service ${service_count} `, () => {
    _.forEach([25, 50, 100, 200], count => {
      it("x" + count, () => {
        global.x = 0;
        global._intersection = 0;
        let services = ['s1', 's2', 's3', 's4'];

        for (var i = 0; i < count; i++) {
          let service = _.sample(services);
          let query = ['*', ['main', service], {
            length: 10
          }]
          let result = tested.place(query);
        }
        console.log('put per sec', global.x / (tested.last_time / 1e9 + tested.snap_time / 1e9));
        console.log('opc', global.x);
        console.log('int', global._intersection);
        console.log('query  :', tested.last_time / 1e9);
        console.log('snap  :', tested.snap_time / 1e9);
      });
    });

  });
});
