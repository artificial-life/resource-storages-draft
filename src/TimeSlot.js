'use strict'

var Box = require('./Classes/Box.js');
var TimeChunk = require('./time-chunk.js');

class TimeSlot extends Box {
    constructor(init_data, parent = 'a') {
        super(init_data, parent);

        this.parts = this.constructor.parts;
    }
    static get parts() {
        return [TimeChunk];
    }
}

module.exports = TimeSlot;