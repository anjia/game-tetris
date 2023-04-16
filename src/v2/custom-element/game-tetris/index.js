import '../game-context/index.js'

import Base from '../js/CustomBase.js'

customElements.define('game-tetris', class extends Base {
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
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        this.person1 = Base.create('game-context')
        shadow.appendChild(this.person1)

        let text = Base.createDiv({ 'text': 'VS' })
        this.btnStart = Base.createButton('开始')
        this.btnPause = Base.createButton('暂停')
        this.btnReplay = Base.createButton('重玩')
        let op = Base.createDiv({}, [this.btnStart, this.btnPause, this.btnReplay])
        shadow.appendChild(Base.createDiv({ 'class': 'vs' }, [text, op]))

        this.person2 = Base.create('game-context')
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