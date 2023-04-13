import all from '../js/shape/all.js'
import { createLink } from '../js/utility.js'

customElements.define('next-shape', class extends HTMLElement {

    static get observedAttributes() {
        return ['index']
    }

    constructor() {
        super()

        // 实例数据
        this.container = null  // DOM
        this.shapeList = []    // 形状对象列表
        this.cur;              // 形状的当前下标

        // 处理数据：所有的形状
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push([])
        }
        for (let shape of all) {
            this.shapeList.push(new shape())
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
        shadow.appendChild(createLink('./custom-element/next-shape/index.css'))

        this.container = document.createElement('section')
        this.container.setAttribute('class', 'grid')
        let innerHTML = ''
        for (let item of arr) {
            innerHTML += '<span class="' + item.join(' ') + '"></span>'
        }
        this.container.innerHTML = innerHTML
        shadow.appendChild(this.container)
    }

    set next(x) {
        if (x && x !== this.cur) {
            this.cur = x
            this.container.className = 'grid shape-' + this.shapeList[this.cur].constructor.name
        }
    }

    get next() {
        return this.shapeList[this.cur]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.next = newValue
        }
    }
})