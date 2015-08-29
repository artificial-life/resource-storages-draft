'use strict'


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
    getDescription() {
        return {
            type: this.constructor.name,
            action: this.action
        }
    }
}

module.exports = BasicGenerator;