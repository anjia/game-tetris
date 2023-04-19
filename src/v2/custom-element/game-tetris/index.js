import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'

customElements.define('game-tetris', class extends Base {
    constructor() {
        super()

        // 获取 HTML 属性
        const people = parseInt(this.getAttribute('people')) || 1
        const race = parseInt(this.getAttribute('race')) || 3

        // 局部变量
        const context = []
        for (let i = 0; i < people; i++) {
            context.push(Base.create('game-context', { 'people': people, 'race': race }))
        }
        const btnStart = Base.createButton('开始')
        const btnPause = Base.createButton('暂停')
        const btnReplay = Base.createButton('重玩')

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        let op = Base.createDiv({}, [btnStart, btnPause, btnReplay])
        if (people === 1) {
            shadow.appendChild(context[0])
            shadow.appendChild(op)
        } else {
            shadow.appendChild(context[0])
            for (let i = 1; i < people; i++) {
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
            GameContext.reset()  // 清空静态属性相关，比如形状、分数
            for (let c of context) {
                c.resetInfo()    // 清空结果类信息，比如行数
                c.reset()        // 清空其它
            }
        })
    }
})