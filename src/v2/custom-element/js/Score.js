import '../total-score/index.js'
import Base from './CustomBase.js'

class Score {

    static type = 3;
    static list = []

    constructor() { }

    add(type) {
        console.log('Score type=', type)
        if (!this.constructor.type) {
            this.constructor.type = type
        }
        const element = Base.create('total-score', { 'type': type })
        this.constructor.list.push(element)
        return element
    }

    clear(element, lines) {
        element.clear(lines)

        // 更新其它 score 的 vs 值
        if (this.constructor.type > 1) {
            // 原地排序，从小到大
            this.constructor.list.sort((a, b) => {
                const dist = a.score - b.score
                if (dist > 0) return 1
                else if (dist < 0) return -1
                return 0
            })

            // 最大的和次大的比，其余和最大值比
            const list = this.constructor.list
            const len = list.length
            const max = list[len - 1].score
            list[len - 1].vs = list[len - 2].score
            for (let i = 0; i < len - 1; i++) {
                list[i].vs = max
            }
        }
    }

    reset(element) {
        element.reset()
    }
}

export default Score