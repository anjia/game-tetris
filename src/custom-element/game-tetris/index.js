import '../game-context/index.js'

import { createLink } from '../js/utility.js'

customElements.define('game-tetris', class extends HTMLElement {
    constructor() {
        super()

        // 实例属性
        this.type = this.getAttribute('type')
        this.person1 = null
        this.person2 = null

        this.btnStart = null
        this.btnPause = null
        this.btnReplay = null

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/game-tetris/index.css'))

        this.person1 = document.createElement('game-context')
        shadow.appendChild(this.person1)

        let div = document.createElement('div')
        let text = document.createTextNode('VS')
        div.appendChild(text)
        this.btnStart = document.createElement('button')
        this.btnStart.innerText = '开始'
        div.appendChild(this.btnStart)
        this.btnPause = document.createElement('button')
        this.btnPause.innerText = '暂停'
        div.appendChild(this.btnPause)
        this.btnReplay = document.createElement('button')
        this.btnReplay.innerText = '重玩'
        div.appendChild(this.btnReplay)
        shadow.appendChild(div)

        this.person2 = document.createElement('game-context')
        shadow.appendChild(this.person2)

        // 注册事件
        this.btnStart.onclick = () => {
            console.log('game-tetris() start')
            this.person1.start()
            // this.person2.start()
        }
        this.btnPause.onclick = () => {
            console.log('game-tetris() pause')
            this.person1.pause()
            // this.person2.pause()
        }
        this.btnReplay.onclick = () => {
            console.log('game-tetris() reset')
            this.person1.reset()
            // this.person2.reset()
        }
    }
})