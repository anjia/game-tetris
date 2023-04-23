import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'

class Tetris extends Base {

    // 状态
    static #PREPARING = 0
    static #PLAYING = 1
    static #PAUSING = 2
    static #GAMEOVER = 3

    // 私有变量
    #people;
    #context;    // <game-context>[]
    #status = Tetris.#PREPARING;
    #overCounter = 0
    #btnStart;
    #btnReset;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取 HTML 属性
        this.#people = parseInt(this.getAttribute('people')) || 1
        const games = parseInt(this.getAttribute('games')) || 3

        // 构造 DOM
        this.#context = []
        for (let i = 0; i < this.#people; i++) {
            this.#context.push(Base.create('game-context', { 'people': this.#people, 'games': games }))
        }
        this.#btnStart = Base.create('button', { 'class': 'start' })
        this.#btnReset = Base.create('button', { 'text': '重置' })

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        let op = Base.create('div', {}, [this.#btnStart, this.#btnReset])
        if (this.#people === 1) {
            shadow.appendChild(this.#context[0])
            shadow.appendChild(op)
        } else {
            shadow.appendChild(this.#context[0])
            for (let i = 1; i < this.#people; i++) {
                let text = Base.create('div', { 'text': 'VS' })
                let children = [text]
                if (i === 1) {
                    children.push(op)
                }
                shadow.appendChild(Base.create('div', { 'class': 'vs' }, children))
                shadow.appendChild(this.#context[i])
            }
        }

        // 监听事件
        this.#addEventListener()
    }

    #addEventListener() {

        this.#btnStart.addEventListener('click', () => {
            switch (this.#status) {
                case Tetris.#PREPARING:
                    this.#setStatus(Tetris.#PLAYING)    // 状态：未开始 -> 游戏中
                    this.#start()                      // 动作：开始游戏
                    break
                case Tetris.#PLAYING:
                    this.#setStatus(Tetris.#PAUSING)    // 状态：游戏中 -> 暂停
                    this.#pause()                      // 动作：暂停游戏
                    break
                case Tetris.#PAUSING:
                    this.#setStatus(Tetris.#PLAYING)    // 状态：暂停 -> 游戏中
                    this.#continue()                   // 动作：继续游戏
                    break
                case Tetris.#GAMEOVER:
                    this.#reset()
                    break
            }
        })

        this.#btnReset.addEventListener('click', () => {
            this.#reset()
        })

        this.addEventListener('gameover', () => {
            this.#overCounter++
            if (this.#overCounter === this.#people) {
                this.#setStatus(Tetris.#GAMEOVER)
                // TODO. 比分数：谁多谁赢
                // this.#context[i].win()
            }
        })
    }

    #start() {
        for (let c of this.#context) {
            c.start()
        }
    }

    #pause() {
        for (let c of this.#context) {
            c.pause()
        }
    }

    #continue() {
        for (let c of this.#context) {
            c.continue()
        }
    }

    #reset() {
        this.#setStatus(Tetris.#PREPARING)
        this.#overCounter = 0

        GameContext.reset()  // 重置全局类
        for (let c of this.#context) {
            c.resetPanel()   // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
            c.reset()        // 重置其它元素，比如 <clear-lines>, <win-counter>
        }
    }

    #setStatus(x) {
        this.#status = x
        switch (this.#status) {
            case Tetris.#PREPARING:
                this.#btnStart.className = 'start'
                break
            case Tetris.#PLAYING:
                this.#btnStart.className = 'start pause'
                break
            case Tetris.#PAUSING:
                this.#btnStart.className = 'start continue'
                break
            case Tetris.#GAMEOVER:
                this.#btnStart.className = 'start gameover'
                break
        }
    }
}

customElements.define('game-tetris', Tetris)