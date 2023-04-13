import '../game-context/index.js'

import ShapeProducer from '../js/shape/Producer.js'
import { createLink } from '../js/utility.js'

customElements.define('game-tetris', class extends HTMLElement {
    constructor() {
        super()

        console.log('game-tetris constructor()')

        // 实例属性
        this.rows = 20
        this.columns = 10
        this.type = this.getAttribute('type')

        this.contextId = this.getAttribute('context-template-id')
        this.person1 = null
        this.person2 = null
        this.shaper = new ShapeProducer()  // 共用

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/game-tetris/index.css'))

        this.person1 = document.createElement('game-context')
        this.person1.templateId = this.contextId
        this.person1.shaper = this.shaper
        shadow.appendChild(this.person1)

        let text = document.createElement('div')
        text.innerText = 'VS'
        shadow.appendChild(text)

        this.person2 = document.createElement('game-context')
        this.person2.templateId = this.contextId
        this.person2.shaper = this.shaper
        shadow.appendChild(this.person2)
    }

    connectedCallback() {
        console.log('game-tetris connectedCallback()')
    }
})