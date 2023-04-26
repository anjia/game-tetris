import Base from '../js/CustomBase.js'
import all from '../js/tetris/all.js'

customElements.define('next-shape', class extends Base {

    // 私有属性
    #container = null  // DOM
    #list = []         // 形状对象列表
    #cur = 0           // 形状的当前下标
    #domCells = []

    constructor() {
        super()

        // 处理数据：所有的形状
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push([])
        }
        for (let shape of all) {
            this.#list.push(new shape())
            const matrix = shape.next
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === 1) {
                        arr[i * 4 + j].push(shape.name)
                    }
                }
            }
        }
        for (let item of arr) {
            this.#domCells.push(Base.create('span', { 'class': item.join(' ') }))
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
            this.#container.className = 'grid shape-' + this.shape.constructor.name
        }
    }

    set level(x) {
        const shape = this.shape
        // const name = shape.constructor.name
        // this.#domCells.forEach(cell => {
        //     let arr = []
        //     cell.classList.forEach(item => {
        //         if (item.indexOf('l') === -1) {
        //             arr.push(item)
        //         }
        //         if (item === name) {
        //             arr.push('l' + level)
        //         }
        //     })
        //     cell.className = arr.join(' ')
        // })
    }
})