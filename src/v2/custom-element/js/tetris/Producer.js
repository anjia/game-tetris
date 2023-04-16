import All from './all.js'

class Producer {

    static #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }

    // 私有属性
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
            const num = this.constructor.#getRandomInt(this.#total)
            this.#List.push(num)
        }
        // console.log(this.#List)
        return this.#List[start]
    }
}

export default Producer