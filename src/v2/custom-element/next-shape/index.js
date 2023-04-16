import Base from '../js/CustomBase.js'
import all from '../js/tetris/all.js'

customElements.define('next-shape', class extends Base {

    // 私有属性
    #container = null  // DOM
    #shapeList = []    // 形状对象列表
    #cur = 0;          // 形状的当前下标

    constructor() {
        super()

        // 处理数据：所有的形状
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push([])
        }
        for (let shape of all) {
            this.#shapeList.push(new shape())
            const matrix = shape.matrix
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === 1) {
                        arr[i * 4 + j].push(shape.name)
                    }
                }
            }
        }

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/next-shape/index.css'))

        this.#container = Base.create('section', { 'class': 'grid' })
        let innerHTML = ''
        for (let item of arr) {
            innerHTML += '<span class="' + item.join(' ') + '"></span>'
        }
        this.#container.innerHTML = innerHTML
        shadow.appendChild(this.#container)
    }

    // 获取 shape object
    get shape() {
        return this.#shapeList[this.#cur]
    }

    // 设置 shape 下标
    set shape(x) {
        if (x !== this.#cur) {
            this.#cur = x
            this.#container.className = 'grid shape-' + this.#shapeList[this.#cur].constructor.name
        }
    }
})