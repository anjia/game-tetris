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
        this.comShaper = null
        this.shapeNameList = null
        this.shapeList = []

        this.domScore = null
        this.domClears = null
        this.domNext = null
        this.domPanel = null
        this.domWin = null
        this.btnHandler = null

        // shadow DOM
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/game-context/index.css'))

        let div = document.createElement('div')
        div.className = 'box'
        this.domScore = document.createElement('total-score')
        this.domScore.setAttribute('type', '2')
        div.appendChild(this.domScore)
        shadow.appendChild(div)

        div = document.createElement('div')
        div.className = 'flex'
        this.domClears = document.createElement('clear-lines')
        this.domClears.className = 'flex-item box'
        div.appendChild(this.domClears)
        this.domNext = document.createElement('next-shape')
        this.domNext.className = 'flex-item box'
        div.appendChild(this.domNext)
        shadow.appendChild(div)

        div = document.createElement('div')
        div.className = 'box'
        this.domPanel = document.createElement('grid-panel')
        div.appendChild(this.domPanel)
        shadow.appendChild(div)

        div = document.createElement('div')
        div.className = 'box'
        this.domWin = document.createElement('win-counter')
        this.domWin.setAttribute('value', '0')
        this.domWin.setAttribute('max', '3')
        div.appendChild(this.domWin)
        shadow.appendChild(div)

        this.btnHandler = document.createElement('op-handler')
        shadow.appendChild(this.btnHandler)
    }

    connectedCallback() {
        console.log('game-context connectedCallback()')
        console.log('=== this.innerHTML', this.innerHTML)
    }

    set shaper(x) {
        this.comShaper = x
        const next = this.comShaper.next(0)
        this.domNext.next = next
    }

})