import All from './all.js'

class Producer {
    constructor() {
        this.all = []
        for (let i = 0; i < All.length; i++) {
            // 初始化形状， (col2 - 1, col2)
            const shape = new All[i]()
            this.all.push(shape)
        }
    }
    next() {
        const next = this.#getRandomInt(this.all.length)
        return this.all[next]
    }

    #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }
}

export default Producer