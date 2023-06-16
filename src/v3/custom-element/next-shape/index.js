import '../grid-cell/index.js'

import Base from '../js/CustomBase.js'
import all from '../js/tetris/all.js'

customElements.define('next-shape', class extends Base {

    // 私有属性
    #list = []         // 形状对象列表
    #cur;              // 形状的当前下标
    #container = null  // DOM
    #domCells = []

    constructor() {
        super()

        this.level = 1

        for (let shape of all) {
            this.#list.push(new shape())
        }
        for (let i = 0; i < 8; i++) {
            this.#domCells.push(Base.create('grid-cell'))
        }

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/next-shape/index.css'))

        this.#container = Base.create('section', { 'class': 'grid' }, this.#domCells)
        shadow.appendChild(this.#container)
    }

    get shape() {
        return this.#list[this.#cur]
    }

    get next() {
        return this.#cur
    }

    set next(x) {
        if (x !== this.#cur) {
            this.#cur = x
            const shape = this.#list[this.#cur]
            const matrix = shape.constructor.next
            for (let i = 0; i < matrix.length; i++) {
                const column = matrix[i].length
                const start = i * column
                for (let j = 0; j < column; j++) {
                    if (matrix[i][j] === true) {
                        this.#domCells[start + j].draw(shape.type, this.level)
                    } else {
                        this.#domCells[start + j].reset()
                    }
                }
            }
        }
    }
})