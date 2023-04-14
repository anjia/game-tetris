import '../total-score/index.js'
import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../win-counter/index.js'
import '../op-handler/index.js'

import ShapeProducer from '../js/shape/Producer.js'
import { createLink } from '../js/utility.js'

customElements.define('game-context', class extends HTMLElement {

    static shaper = new ShapeProducer()  // shape 生产者

    constructor() {
        super()

        // 实例属性
        this.shapeCounter = 0   // shape 的消费计数

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
        div.appendChild(this.domWin)
        shadow.appendChild(div)

        this.btnHandler = document.createElement('op-handler')
        shadow.appendChild(this.btnHandler)

        // 初始化数据
        this.#getNewNext()
    }

    start() {
        this.domPanel.start(this.domNext.shape, this.domClears.speed)
    }

    pause() {
        this.domPanel.pause()
    }

    reset() {
        this.domScore.reset()
        this.domClears.reset()
        this.domPanel.reset()
        this.domWin.reset()
    }

    #getNewNext() {
        this.domNext.shape = (this.constructor.shaper).next(this.shapeCounter)
        this.shapeCounter++
    }
})