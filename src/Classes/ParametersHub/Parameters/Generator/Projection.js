'use sctrict'

var BasicGenerator = require('./BasicGenerator.js');

class Projection {
    gerAction() {
        var projection = (context) => {
            return this.action(context[this.param]);
        }
        return projection;
    }
}

module.exports = Projection;