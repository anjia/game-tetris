import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'

customElements.define('game-tetris', class extends Base {

    #people;
    #overCounter = 0

    constructor() {
        super()

        // 获取 HTML 属性
        this.#people = parseInt(this.getAttribute('people')) || 1
        const race = parseInt(this.getAttribute('race')) || 3

        // 局部变量
        const context = []
        for (let i = 0; i < this.#people; i++) {
            context.push(Base.create('game-context', { 'people': this.#people, 'race': race }))
        }
        const btnStart = Base.createButton('开始')
        const btnPause = Base.createButton('暂停')
        const btnAgain = Base.createButton('再来一局')

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        let op = Base.createDiv({}, [btnStart, btnPause, btnAgain])
        if (this.#people === 1) {
            shadow.appendChild(context[0])
            shadow.appendChild(op)
        } else {
            shadow.appendChild(context[0])
            for (let i = 1; i < this.#people; i++) {
                let text = Base.createDiv({ 'text': 'VS' })
                let children = [text]
                if (i === 1) {
                    children.push(op)
                }
                shadow.appendChild(Base.createDiv({ 'class': 'vs' }, children))
                shadow.appendChild(context[i])
            }
        }

        // 监听事件
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
        btnAgain.addEventListener('click', () => {
            this.#overCounter = 0
            GameContext.reset()  // 重置全局类
            for (let c of context) {
                c.resetPanel()   // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
                c.reset()        // 重置其它元素，比如 <clear-lines>, <win-counter>
            }
        })

        this.addEventListener('gameover', () => {
            this.#overCounter++
            if (this.#overCounter === this.#people) {
                // 比分数：谁多谁赢
                // context[i].win()
            }
        })
    }
})