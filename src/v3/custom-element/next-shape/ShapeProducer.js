import TetrisFactory from './factory/TetrisFactory.js'
import TrickFactory from './factory/TrickFactory.js'

export default class ShapeProducer {

    static #getRandomInt(max) {
        // [0, max)
        return Math.floor(Math.random() * max)  // [0, 1)   Math.random() 
    }

    // 私有变量
    #queue = []     // TODO. 队列被消费完了的项，可以删除
    #counter = 0
    #group = 10     // 每10次，生成一个 TrickShape
    #hadTrick = false

    constructor() {
        this.tetrisFactory = new TetrisFactory()
        this.trickFactory = new TrickFactory()
    }

    reset() {
        this.#queue.length = 0
        this.#counter = 0
    }

    consume(index = 0) {
        const queue = this.#queue
        if (index < 0) {
            index = 0
        } else if (index > queue.length) {
            index = queue.length
        }

        if (index === queue.length) {
            if (this.#counter % this.#group === 0) {
                this.#hadTrick = false
            }
            const num = this.getRandomShapeIndex()
            queue.push(num)
            this.#counter++
        }
        return queue[index]
    }

    createShapeList() {
        const list1 = this.tetrisFactory.createShapeList()
        const list2 = this.trickFactory.createShapeList()
        return list1.concat(list2)
    }

    getRandomShapeIndex() {
        // 如果没有 trick，且 1/group 的概率出 trick
        // 是否意味着...有可能会不出了
        if (!this.#hadTrick && ShapeProducer.#getRandomInt(this.#group) === 0) {
            this.#hadTrick = true
            return this.tetrisFactory.length + ShapeProducer.#getRandomInt(this.trickFactory.length)
        } else {
            return ShapeProducer.#getRandomInt(this.tetrisFactory.length)
        }
    }
}