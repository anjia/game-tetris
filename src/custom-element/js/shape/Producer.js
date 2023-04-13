import All from './all.js'

class Producer {
    constructor() {
        // 实例属性
        this.total = All.length
        this.nextList = []
    }

    next(start = 0) {
        if (start < 0) {
            start = 0
        }
        if (start > this.nextList.length) {
            start = this.nextList.length
        }
        if (start === this.nextList.length) {
            const num = this.#getRandomInt(this.total)
            this.nextList.push(num)
        }
        return this.nextList[start]
    }

    #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }
}

export default Producer