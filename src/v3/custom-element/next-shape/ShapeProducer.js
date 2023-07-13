import ShapeFactory from './ShapeFactory.js'

export default class ShapeProducer {

    static list = ['O', 'I', 'T', 'J', 'L', 'S', 'Z']
    static getRandomInt() {
        const max = this.list.length            // [0, max)
        return Math.floor(Math.random() * max)  // [0, 1)   Math.random() 
    }

    // 私有变量
    #queue = []     // TODO. 队列被消费完了的项，可以删除

    constructor() { }

    createShapeList() {
        let result = []
        for (let name of ShapeProducer.list) {
            result.push(new ShapeFactory(name))
        }
    }

    consume(index = 0) {
        const queue = this.#queue
        if (index < 0) {
            index = 0
        } else if (index > queue.length) {
            index = queue.length
        }

        if (index === queue.length) {
            const num = ShapeProducer.getRandomInt()  // 只存了形状的下标
            queue.push(num)
        }
        return queue[index]
    }

    reset() {
        this.#queue.length = 0
    }
}