import { addClass, removeClassStart } from '../js/CSSOM.js'

import Base from '../js/CustomBase.js'

class Cell extends Base {

    // 私有属性
    #$cell;           // dom 以 $ 开头
    #_value = false   // value，私有属性以_开头（以防后续有getter/setter，因为这在自定义组件中很常见）

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/grid-cell/index.css'))
        this.#$cell = Base.create('div')
        shadow.appendChild(this.#$cell)
    }

    get value() {
        return this.#_value
    }
    get className() {
        return this.#$cell.className
    }

    reset() {
        this.#_value = false
        this.#$cell.className = ''
    }

    merge() {
        this.#_value = true
    }

    copy(obj) {
        this.#_value = obj.value
        this.#$cell.className = obj.className
    }

    dark() {
        this.#$cell.className = ''
    }

    light() {
        this.#$cell.className = 's'
    }

    blink() {
        addClass(this.#$cell, 'blink')
    }

    draw(type, level) {
        removeClassStart(this.#$cell, 'l')
        addClass(this.#$cell, ['s', type, 'l' + level])
    }
}

customElements.define('grid-cell', Cell)