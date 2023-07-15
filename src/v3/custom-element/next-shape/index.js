import '../grid-cell/index.js'

import Base from '../Base.js'

customElements.define('next-shape', class extends Base {

    // 私有属性
    #cellList = []     // <grid-cell> list
    #shapeList = []    // 形状对象列表
    #cur;              // 形状的当前下标
    #counter = 0       // shape 的消费计数

    constructor() {
        super()

        for (let i = 0; i < 8; i++) {
            this.#cellList.push(Base.create('grid-cell'))
        }

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/next-shape/index.css'))

        const container = Base.create('section', { 'class': 'grid' }, this.#cellList)
        shadow.appendChild(container)

        // 初始化形状
        // this.refresh()
    }

    set shapeSubject(x) {
        this.shapeProducer = x
        this.#shapeList = this.shapeProducer.createShapeList()
    }

    get shape() {
        return this.#shapeList[this.#cur]
    }

    reset() {
        this.#counter = 0
    }

    refresh(level = 1) {
        const next = this.shapeProducer.consume(this.#counter)
        this.#counter++
        if (next !== this.#cur) {
            this.#cur = next
            const shape = this.#shapeList[this.#cur]
            const matrix = shape.constructor.next
            for (let i = 0; i < matrix.length; i++) {
                const column = matrix[i].length
                const start = i * column
                for (let j = 0; j < column; j++) {
                    if (matrix[i][j] === true) {
                        this.#cellList[start + j].draw(shape.type, level)
                    } else {
                        this.#cellList[start + j].reset()
                    }
                }
            }
        }
    }
})