import TetrisFactory from './factory/TetrisFactory.js'
import TrickFactory from './factory/TrickFactory.js'

export default class ShapeProducer {

    // 私有变量
    #queue = []     // TODO. 队列被消费完了的项，可以删除
    #GROUP = 10     // 每10次，生成一个 TrickShape
    #trickIndex = -1
    #trickCounter = 0

    constructor() {
        this.tetrisFactory = new TetrisFactory()
        this.trickFactory = new TrickFactory()
    }

    reset() {
        this.#queue.length = 0
        this.#trickIndex = -1
        this.#trickCounter = 0
    }

    consume(index = 0) {
        const queue = this.#queue
        if (index < 0) {
            index = 0
        } else if (index > queue.length) {
            index = queue.length
        }

        if (index === queue.length) {
            const num = this.getRandomShapeIndex()
            queue.push(num)
        }
        return queue[index]
    }

    createShapeList() {
        const list1 = this.tetrisFactory.createShapeList()
        const list2 = this.trickFactory.createShapeList()
        return list1.concat(list2)
    }

    getRandomShapeIndex() {
        // 确定下一组出 trickShape 的下标
        if (this.#queue.length % this.#GROUP === 0) {
            this.#trickIndex = this.#trickCounter * this.#GROUP + this.getRandom()
            this.#trickCounter++
        }

        // 再委托给相应的 Factory
        if (this.#trickIndex > -1 && this.#trickIndex === this.#queue.length) {
            this.#trickIndex = -1
            return this.tetrisFactory.length + this.trickFactory.getRandom()
        } else {
            return this.tetrisFactory.getRandom()
        }
    }

    getRandom() {
        return Math.floor(Math.random() * this.#GROUP)  // [0, this.#GROUP)
    }
}