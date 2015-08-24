'use sctrict'


class BasicGenerator {
    constructor(action) {
        this.action = action;
    }
    setParamName(param) {
        this.param = param;
    }
    getAction() {
        throw new Error("BasicGenerator abstract method 'getAction'");
    }
}

module.exports = BasicGenerator;