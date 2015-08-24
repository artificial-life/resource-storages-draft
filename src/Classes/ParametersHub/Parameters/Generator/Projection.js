'use sctrict'

var BasicGenerator = require('./BasicGenerator.js');

class Projection extends BasicGenerator {
    getAction() {
        var projection = (context) => {
            var param = context[this.param];
            return this.action(param);
        }
        return projection;
    }
}

module.exports = Projection;