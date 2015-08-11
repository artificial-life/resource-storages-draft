'use strict'


class ZeroDimension {
    constructor(state) {
        this.state = state;
        this.params = [];

        this.query_params = {};
        this.query_params = {};
    }
    observe() {

    }
    dimensions() {
        //return this.params.dimensions
        return this.params.length;
    }
}

module.exports = ZeroDimension;