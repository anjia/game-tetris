import All from '../next-shape/tetris/all.js'

class Producer {
    static #total = All.length
    static #list = []

    static reset() {
        this.#list.length = 0
    }

    static next(start) {
        const list = this.#list
        if (typeof start === undefined) {
            start = list.length ? (list.length - 1) : 0
        } else if (start < 0) {
            start = 0
        } else if (start > list.length) {
            start = list.length
        }

        if (start === list.length) {
            const num = this.#getRandomInt(this.#total)
            list.push(num)
        }
        return list[start]
    }

    static #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }

    constructor() { }
}

export default Producer