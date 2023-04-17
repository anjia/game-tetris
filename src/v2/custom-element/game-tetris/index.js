import '../game-context/index.js'

import Base from '../js/CustomBase.js'

customElements.define('game-tetris', class extends Base {
    constructor() {
        super()

        // 实例属性
        this.type = parseInt(this.getAttribute('type')) || 1

        // 局部变量
        const context = []
        for (let i = 0; i < this.type; i++) {
            context.push(Base.create('game-context'))
        }
        const btnStart = Base.createButton('开始')
        const btnPause = Base.createButton('暂停')
        const btnReplay = Base.createButton('重玩')

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        let op = Base.createDiv({}, [btnStart, btnPause, btnReplay])
        if (this.type === 1) {
            shadow.appendChild(context[0])
            shadow.appendChild(op)
        } else {
            shadow.appendChild(context[0])
            for (let i = 1; i < this.type; i++) {
                let text = Base.createDiv({ 'text': 'VS' })
                let children = [text]
                if (i === 1) {
                    children.push(op)
                }
                shadow.appendChild(Base.createDiv({ 'class': 'vs' }, children))
                shadow.appendChild(context[i])
            }
        }

        // 注册事件
        btnStart.addEventListener('click', () => {
            for (let c of context) {
                c.start()
            }
        })
        btnPause.addEventListener('click', () => {
            for (let c of context) {
                c.pause()
            }
        })
        btnReplay.addEventListener('click', () => {
            for (let c of context) {
                c.reset()
            }
        })
    }
})