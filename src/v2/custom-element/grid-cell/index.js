import { addClass } from '../js/CSSOM.js'

import Base from '../js/CustomBase.js'

class Cell extends Base {

    // 私有属性
    #$cell;         // dom 以 $ 开头
    #_v = false    // value，私有属性以_开头（以防后续有getter/setter，因为这在自定义组件中很常见）

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
        return this.#_v
    }

    dark() {
        this.#_v = false
        this.#$cell.className = ''
    }

    light() {
        this.#_v = true
        this.#$cell.className = 's'
    }

    copy(obj) {
        this.#_v = obj.value
        this.#$cell.className = obj.className
    }

    blink() {
        addClass(this.#$cell, 'blink')
    }

    draw(type, level) {
        addClass(this.#$cell, ['s', type, 'l' + level])
    }
}

customElements.define('grid-cell', Cell)