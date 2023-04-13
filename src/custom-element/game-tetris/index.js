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

        this.person1 = null
        this.person2 = null
        this.shaper = new ShapeProducer()  // 共用

        this.btnStart = null
        this.btnReplay = null

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/game-tetris/index.css'))

        this.person1 = document.createElement('game-context')
        this.person1.shaper = this.shaper
        shadow.appendChild(this.person1)

        let div = document.createElement('div')
        let text = document.createTextNode('VS')
        div.appendChild(text)
        this.btnReplay = document.createElement('button')
        this.btnReplay.className = 'btn-replay'
        this.btnReplay.innerText = '重玩'
        div.appendChild(this.btnReplay)
        this.btnStart = document.createElement('button')
        this.btnStart.className = 'btn-start'
        this.btnStart.setAttribute('data-start', '开始')
        this.btnStart.setAttribute('data-pause', '暂停')
        div.appendChild(this.btnStart)
        shadow.appendChild(div)

        this.person2 = document.createElement('game-context')
        this.person2.shaper = this.shaper
        shadow.appendChild(this.person2)

        // 注册事件
        this.btnStart.onclick = this.start
    }

    connectedCallback() {
        console.log('game-tetris connectedCallback()')
    }

    start() {
        console.log('start')
    }
})