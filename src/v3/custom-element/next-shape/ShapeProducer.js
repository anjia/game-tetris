// TODO. import 的路径，如何写更灵活？以及 import 的规则
import All from '../next-shape/tetris/all.js'

export default class Producer {

    // 私有变量
    #total = All.length
    #queue = []     // TODO. 理论上是个队列，且被消费完了的可以删除

    constructor() { }

    reset() {
        this.#queue.length = 0
    }

    consume(index) {
        const queue = this.#queue
        if (typeof index === undefined) {
            index = queue.length ? (queue.length - 1) : 0
        } else if (index < 0) {
            index = 0
        } else if (index > queue.length) {
            index = queue.length
        }

        if (index === queue.length) {
            const num = this.#getRandomInt(this.#total)  // 只存了形状的下标
            queue.push(num)
        }
        return queue[index]
    }

    #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }
}