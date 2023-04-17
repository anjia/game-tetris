import All from './all.js'

class Producer {

    static #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }

    static #total = All.length
    static #list = []

    constructor() { }

    reset() {
        this.constructor.#list.length = 0
    }

    next(start) {
        const list = this.constructor.#list
        if (typeof start === undefined) {
            start = list.length ? (list.length - 1) : 0
        } else if (start < 0) {
            start = 0
        } else if (start > list.length) {
            start = list.length
        }

        if (start === list.length) {
            const num = this.constructor.#getRandomInt(this.constructor.#total)
            list.push(num)
        }
        return list[start]
    }
}

export default Producer