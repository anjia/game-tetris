import '../total-score/index.js'
import Base from './CustomBase.js'

class Score {

    static people = 1;     // 可以被修改
    static #list = []

    static create(key) {
        const element = Base.create('total-score', { 'people': this.people, 'key': key })
        this.#list.push(element)
        return element
    }

    static get winner() {
        const score = this.#list[0].score
        const key = this.#list[0].key
        return score > 0 ? key : -1
    }

    static clear(element, lines) {
        element.clear(lines)

        // 更新其它 score 的 vs 值
        if (this.people > 1) {
            // 原地排序，从大到小
            this.#list.sort((a, b) => {
                const dist = a.score - b.score
                if (dist > 0) return -1
                else if (dist < 0) return 1
                return 0
            })

            // 最大的和次大的比，其余和最大值比
            const max = this.#list[0].score
            this.#list[0].vs = this.#list[1].score
            for (let i = 1; i < this.#list.length; i++) {
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