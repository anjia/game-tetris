import '../total-score/index.js'
import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../win-counter/index.js'
import '../op-handler/index.js'

import { createLink } from '../js/utility.js'

customElements.define('game-context', class extends HTMLElement {
    constructor() {
        super()

        // 实例属性
        this.rows = 20
        this.columns = 10
        this.shaper = null

        console.log('game-context constructor()')

        // shadow DOM
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(createLink('./custom-element/game-context/index.css'))
    }

    connectedCallback() {
        console.log('game-context connectedCallback()')
    }

    set shaper(x) {
        this.dataNext = x
    }
    set templateId(x) {
        const template = document.getElementById(x)
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
})