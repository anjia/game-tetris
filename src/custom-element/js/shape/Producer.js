import All from './all.js'

import { getRandomInt } from '../utility.js'

class Producer {

    // private fields
    #total = All.length
    #List = []

    constructor() {

    }

    reset() {
        this.#List.length = 0
    }

    next(start) {
        if (typeof start === undefined) {
            start = this.#List.length ? (this.#List.length - 1) : 0
        } else if (start < 0) {
            start = 0
        } else if (start > this.#List.length) {
            start = this.#List.length
        }

        if (start === this.#List.length) {
            const num = getRandomInt(this.#total)
            this.#List.push(num)
        }
        return this.#List[start]
    }
}

export default Producer