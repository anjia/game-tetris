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

        for (let shape of all) {
            this.#list.push(new shape())
        }
        for (let i = 0; i < 8; i++) {
            this.#domCells.push(Base.create('grid-cell'))
        }
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/next-shape/index.css'))

        this.#container = Base.create('section', { 'class': 'grid' }, this.#domCells)
        shadow.appendChild(this.#container)
    }

    // 获取 shape object
    get shape() {
        return this.#list[this.#cur]
    }

    get next() {
        return this.#cur
    }

    set next(x) {
        if (x !== this.#cur) {
            this.#cur = x
            const matrix = this.shape.constructor.next
            for (let i = 0; i < matrix.length; i++) {
                const column = matrix[i].length
                const start = i * column
                for (let j = 0; j < column; j++) {
                    if (matrix[i][j] === false) {
                        this.#domCells[start + j].reset()
                    } else {
                        this.#domCells[start + j].draw(this.shape.type, '')
                    }
                }
            }
        }
    }

    set level(x) {
        this.#container.className = 'grid l' + x
    }
})