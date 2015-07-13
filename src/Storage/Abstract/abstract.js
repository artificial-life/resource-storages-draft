'use strict'

class AbstractStorage {
    constructor() {

    }
    compose(params) {
        throw new Error('Abstract function');
    }
    observe(params) {
        throw new Error('Abstract function');
    }
}


module.exists = AbstractStorage;