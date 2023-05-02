import { addClass } from '../js/CSSOM.js'

import Base from '../js/CustomBase.js'

class Cell extends Base {

    // 私有属性
    #$;      // dom 以 $ 开头
    #_v = 0  // value，私有属性以_开头（以防后续有getter/setter，因为这在自定义组件中很常见）

    constructor() {
        super()
    }
    connectedCallback() {
        if (!this.isConnected) return
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/grid-cell/index.css'))
        this.#$ = Base.create('div')
        shadow.appendChild(this.#$)
    }

    get value() {
        return this.#_v
    }

    dark() {
        this.#_v = false
        this.#$.className = ''
    }

    light() {
        this.#_v = true
        this.#$.className = 's'
    }

    copy(obj) {
        this.#_v = obj.value
        this.#$.className = obj.className
    }

    blink() {
        addClass(this.#$, 'blink')
    }

    draw(type, level) {
        addClass(this.#$, ['s', type, 'l' + level])
    }
}

customElements.define('grid-cell', Cell)