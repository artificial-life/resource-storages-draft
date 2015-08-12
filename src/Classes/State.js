'use strict'

const AVAILABLE = Symbol('AVAILABLE');
const NOT_AVAILABLE = Symbol('NOT AVAILABLE');
const RESERVED = Symbol('RESERVED');
const STATE = Symbol('STATE');

class State {
    constructor(state, owner = false) {

        switch (state.toLowerCase()) {
        case 'a':
        case 'availble':
            this.setAvailable();
            break;
        case 'r':
        case 'reserved':
            this.setReseved(owner);
            beak;
        default:
            this.setNotAvailable();
            break;
        }

    }
    isReserved() {
        return this[STATE] === RESERVED;
    }
    isAvailable() {
        return this[STATE] === AVAILABLE;
    }
    isNotAvailable() {
        return this[STATE] === NOT_AVAILABLE;
    }
    exists() {
        return this[STATE] !== NOT_AVAILABLE;
    }
    setReserved(owner) {
        this.owner = owner;
        this[STATE] = RESERVED;
        return this;
    }
    setAvailable() {
        this[STATE] = AVAILABLE;
        return this;
    }
    setNotAvailable() {
        this[STATE] = NOT_AVAILABLE;
        return this;
    }
    toString() {
        return this[STATE].toString().match(/Symbol\((.*)\)/)[1];
    }
    getOwner() {
        return this.owner;
    }
    mix(state) {
        var state_str;
        var owner = false;

        if (state.isAvailable() && this.isAvailable()) {
            state_str = 'a';
        } else
        if (state.isNotAvailable() || this.isNotAvailable()) {
            state_str = 'na';
        } else
        if (state.isReserved() || this.isReserved()) {
            state_str = 'r';
            owner = 'MIXED';
        }

        return new State(state_str, owner);
    }
}

module.exports = State;