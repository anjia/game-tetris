import '../total-score/index.js'
import Base from './CustomBase.js'

class Score {

    static type = 1;     // 可以被修改
    static #list = []

    static create() {
        const element = Base.create('total-score', { 'type': this.type })
        this.#list.push(element)
        return element
    }

    static clear(element, lines) {
        element.clear(lines)

        // 更新其它 score 的 vs 值
        if (this.type > 1) {
            // 原地排序，从小到大
            this.#list.sort((a, b) => {
                const dist = a.score - b.score
                if (dist > 0) return 1
                else if (dist < 0) return -1
                return 0
            })

            // 最大的和次大的比，其余和最大值比
            const len = this.#list.length
            const max = this.#list[len - 1].score
            this.#list[len - 1].vs = this.#list[len - 2].score
            for (let i = 0; i < len - 1; i++) {
                this.#list[i].vs = max
            }
        }
    }

    static reset() {
        for (let element of this.#list) {
            element.reset()
        }
    }

    constructor() { }
}

export default Score