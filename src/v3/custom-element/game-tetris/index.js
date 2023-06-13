import Base from '../js/CustomBase.js'
import Store from '../js/Store.js'

import './single-mode/index.js'
import './vs-mode/index.js'

class Tetris extends Base {

    static get observedAttributes() {
        return ['people', 'games']
    }

    // 按钮
    #btnStart;
    #btnReset;

    #tetris;
    #tetrisSingle;
    #tetrisVS;

    // 状态
    static #PREPARING = 0
    static #PLAYING = 1
    static #PAUSING = 2
    static #GAMEOVER = 3
    static #START_KEY = 'Enter'
    static #RESET_KEY = 'Escape'

    #_status = Tetris.#PREPARING;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))
        shadow.appendChild(Base.create('h1', { 'text': '俄罗斯方块' }))

        // 按钮
        this.#btnStart = Base.create('button', { 'class': 'start', 'data-key': Tetris.#START_KEY })
        this.#btnReset = Base.create('button', { 'text': '重置', 'data-key': Tetris.#RESET_KEY })
        shadow.appendChild(this.#btnStart)
        shadow.appendChild(this.#btnReset)

        // 两种模式
        this.#tetrisSingle = Base.create('single-mode')
        this.#tetrisVS = Base.create('vs-mode')

        const people = Store.mode === '1' ? 1 : (this.getAttribute('people') || Store.people)
        const games = this.getAttribute('games') || Store.games
        if (people > 1) {
            this.#tetris = this.#tetrisVS
            this.#tetris.people = people
            this.#tetris.games = games
        } else {
            this.#tetris = this.#tetrisSingle
        }
        shadow.appendChild(this.#tetris)

        // 监听事件
        this.#addEventListener()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // $0.setAttribute('people', '2') 即便值相等，回调也会执行
        // console.log(`<game-tetris> attributeChangedCallback() name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        if (newValue === null) return
        switch (name) {
            case 'people':
                if (newValue > 1) {
                    this.#tetris = this.#tetrisVS
                    this.#tetris.people = newValue
                } else {
                    this.#tetris = this.#tetrisSingle
                }
                break
            case 'games':
                this.#tetris.games = newValue
                break
        }
    }

    set #status(x) {
        this.#_status = x
        switch (this.#_status) {
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

    #addEventListener() {

        this.#btnStart.addEventListener('click', () => {
            switch (this.#_status) {
                case Tetris.#PREPARING:
                    this.#status = Tetris.#PLAYING     // 状态：未开始 -> 游戏中
                    this.#tetris.start()                               // 动作：开始游戏
                    break
                case Tetris.#PLAYING:
                    this.#status = Tetris.#PAUSING     // 状态：游戏中 -> 暂停
                    this.#tetris.pause()                      // 动作：暂停游戏
                    break
                case Tetris.#PAUSING:
                    this.#status = Tetris.#PLAYING     // 状态：暂停 -> 游戏中
                    this.#tetris.continue()                   // 动作：继续游戏
                    break
                case Tetris.#GAMEOVER:
                    this.#status = Tetris.#PREPARING
                    this.#tetris.reset()
                    break
            }
        })

        this.#btnReset.addEventListener('click', () => {
            this.#status = Tetris.#PREPARING
            this.#tetris.reset()
        })

        this.addEventListener('gameover', () => {
            this.#tetris.gameover()
            // this.#status = GameTetris.#GAMEOVER
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case Tetris.#START_KEY:
                    this.#btnStart.click()
                    break
                case Tetris.#RESET_KEY:
                    this.#btnReset.click()
                    break
            }
        })
    }
}

customElements.define('game-tetris', Tetris)