import all from '../../core/shape/all.js'
import { createLink } from '../utility.js'

customElements.define('next-shape', class extends HTMLElement {

    static get observedAttributes() {
        return ['name']
    }

    constructor() {
        super()

        // 实例数据
        this.name = this.getAttribute('name')
        this.container = null

        // 处理数据：所有的形状
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push([])
        }
        for (let shape of all) {
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

        // style
        shadow.appendChild(createLink('./custom-element/next-shape/index.css'))

        // html
        this.container = document.createElement('section')
        this.container.setAttribute('class', `grid shape-${this.name}`)
        let innerHTML = ''
        for (let item of arr) {
            innerHTML += '<span class="' + item.join(' ') + '"></span>'
        }
        this.container.innerHTML = innerHTML
        shadow.appendChild(this.container)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name' && newValue && this.name !== newValue) {
            this.name = newValue
            this.container.className = 'grid shape-' + this.name
            // this.container.classList[1] = 'shape-' + this.name
        }
    }
})