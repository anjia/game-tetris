import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'

class Tetris extends Base {

    static get observedAttributes() {
        return ['people', 'games']
    }

    // 状态
    static #PREPARING = 0
    static #PLAYING = 1
    static #PAUSING = 2
    static #GAMEOVER = 3
    static #PK_OVER = false

    // 私有变量
    #people;
    #context = [];    // <game-context>[]
    #status = Tetris.#PREPARING;
    #overCounter = 0
    #games = 3;

    #domList;
    #btnStart;
    #btnReset;
    #btnWrap;

    #startKey = 'Enter'
    #resetKey = 'Escape'

    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        const container = Base.create('div')
        this.#domList = Base.create('div', { 'class': 'wrap' })
        container.appendChild(Base.create('h1', { 'text': '俄罗斯方块' }))
        container.appendChild(this.#domList)
        shadow.appendChild(container)

        this.#btnStart = Base.create('button', { 'class': 'start', 'data-key': this.#startKey })
        this.#btnReset = Base.create('button', { 'text': '重置', 'data-key': this.#resetKey })
        this.#btnWrap = Base.create('div', {}, [this.#btnStart, this.#btnReset])

        // 监听事件
        this.#addEventListener()
    }

    connectedCallback() {
        if (!this.isConnected) return

        this.people = this.getAttribute('people')
        this.games = this.getAttribute('games')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // $0.setAttribute('people', '2') 即便值相等，回调也会执行
        // console.log(`<game-tetris> attributeChangedCallback() name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        switch (name) {
            case 'people':
                this.people = newValue
                break
            case 'games':
                this.games = newValue
                break
        }
    }

    set people(x) {
        x = parseInt(x) || 1
        if (x === this.#people) return
        this.#people = x
        this.#btnReset.click()

        this.#context = []
        for (let i = 0; i < this.#people; i++) {
            this.#context.push(Base.create('game-context', { 'people': this.#people, 'games': this.#games, 'key': i }))
        }

        this.#domList.innerHTML = ''
        if (this.#people === 1) {
            this.#domList.parentElement.className = 'single'
            this.#domList.appendChild(this.#context[0])
            this.#domList.appendChild(Base.create('div', { 'class': 'gap' }, [this.#btnWrap]))
        } else {
            this.#domList.parentElement.className = 'vs'
            this.#domList.appendChild(this.#context[0])
            for (let i = 1; i < this.#people; i++) {
                let text = Base.create('div', { 'text': 'VS' })
                let children = [text]
                if (i === 1) {
                    children.push(this.#btnWrap)
                }
                this.#domList.appendChild(Base.create('div', { 'class': 'gap' }, children))
                this.#domList.appendChild(this.#context[i])
            }
        }
    }

    set games(x) {
        x = parseInt(x) || 3
        if (x === this.#games) return
        this.#games = x
        for (let c of this.#context) {
            c.games = x
        }
    }

    #addEventListener() {

        this.#btnStart.addEventListener('click', () => {
            switch (this.#status) {
                case Tetris.#PREPARING:
                    this.#setStatus(Tetris.#PLAYING)   // 状态：未开始 -> 游戏中
                    this.#start()                      // 动作：开始游戏
                    break
                case Tetris.#PLAYING:
                    this.#setStatus(Tetris.#PAUSING)   // 状态：游戏中 -> 暂停
                    this.#pause()                      // 动作：暂停游戏
                    break
                case Tetris.#PAUSING:
                    this.#setStatus(Tetris.#PLAYING)   // 状态：暂停 -> 游戏中
                    this.#continue()                   // 动作：继续游戏
                    break
                case Tetris.#GAMEOVER:
                    this.#reset()
                    break
            }
        })

        this.#btnReset.addEventListener('click', () => {
            Tetris.#PK_OVER = false
            this.#reset()
        })

        this.addEventListener('gameover', () => {
            this.#overCounter++
            if (this.#overCounter === this.#people) {
                this.#setStatus(Tetris.#GAMEOVER)
                // 比分数（谁多谁赢），如果赢的场次等于最大场次了，游戏就结束了
                const key = parseInt(GameContext.winner)
                if (key >= 0 && this.#context[key].win()) {
                    Tetris.#PK_OVER = true
                }
            }
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case this.#startKey:
                    this.#btnStart.click()
                    break
                case this.#resetKey:
                    this.#btnReset.click()
                    break
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
            c.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
            c.reset(Tetris.#PK_OVER)   // 重置其它元素，比如 <clear-lines>, <win-counter>
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