import Base from '../js/CustomBase.js'
import Store from '../js/Store.js'

import TetrisStrategy from './TetrisStrategy.js'
import './single-mode/index.js'
import './vs-mode/index.js'

class GameTetris extends Base {

    static get observedAttributes() {
        return ['people', 'games']
    }

    // 状态
    static #PREPARING = 0
    static #PLAYING = 1
    static #PAUSING = 2
    static #GAMEOVER = 3

    static #START_KEY = 'Enter'
    static #RESET_KEY = 'Escape'

    // 私有变量
    #tetrisStrategy;
    #_status = GameTetris.#PREPARING;

    #domList;
    #btnStart;
    #btnReset;
    #btnWrap;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        const container = Base.create('div')
        this.#domList = Base.create('div', { 'class': 'wrap' })
        container.appendChild(Base.create('h1', { 'text': '俄罗斯方块' }))
        container.appendChild(this.#domList)
        shadow.appendChild(container)

        this.#btnStart = Base.create('button', { 'class': 'start', 'data-key': GameTetris.#START_KEY })
        this.#btnReset = Base.create('button', { 'text': '重置', 'data-key': GameTetris.#RESET_KEY })
        this.#btnWrap = Base.create('div', {}, [this.#btnStart, this.#btnReset])

        this.#singleMode = Base.create('single-mode')
        this.#vsMode = Base.create('vs-mode')
        this.#tetris = null

        // 初始化
        this.#people = Store.mode === '1' ? 1 : (this.getAttribute('people') || Store.people)
        this.#games = this.getAttribute('games') || Store.games

        // 监听事件
        this.#addEventListener()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // $0.setAttribute('people', '2') 即便值相等，回调也会执行
        // console.log(`<game-tetris> attributeChangedCallback() name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        switch (name) {
            case 'people':
                this.#people = newValue
                break
            case 'games':
                this.#games = newValue
                break
        }
    }

    set people(x) {
        x = parseInt(x) || 1
        if (x === this.#_people) return
        this.#_people = x
        this.#btnReset.click()

        this.#context = []
        for (let i = 0; i < this.#_people; i++) {
            this.#context.push(Base.create('game-context', { 'people': this.#_people, 'games': this.#_games, 'key': i }))
        }

        this.#domList.innerHTML = ''
        if (this.#_people === 1) {
            this.#domList.appendChild()
        } else {
            this.#domList.appendChild()
        }
    }

    set games(x) {
        x = parseInt(x) || 3
        if (x === this.#_games) return
        this.#_games = x
        for (let c of this.#context) {
            c.games = x
        }
    }

    set #status(x) {
        this.#_status = x
        switch (this.#_status) {
            case GameTetris.#PREPARING:
                this.#btnStart.className = 'start'
                break
            case GameTetris.#PLAYING:
                this.#btnStart.className = 'start pause'
                break
            case GameTetris.#PAUSING:
                this.#btnStart.className = 'start continue'
                break
            case GameTetris.#GAMEOVER:
                this.#btnStart.className = 'start gameover'
                break
        }
    }

    #addEventListener() {

        this.#btnStart.addEventListener('click', () => {
            switch (this.#_status) {
                case GameTetris.#PREPARING:
                    this.#status = GameTetris.#PLAYING     // 状态：未开始 -> 游戏中
                    this.#tetrisStrategy.#start()                      // 动作：开始游戏
                    break
                case GameTetris.#PLAYING:
                    this.#status = GameTetris.#PAUSING     // 状态：游戏中 -> 暂停
                    this.#tetrisStrategy.#pause()                      // 动作：暂停游戏
                    break
                case GameTetris.#PAUSING:
                    this.#status = GameTetris.#PLAYING     // 状态：暂停 -> 游戏中
                    this.#tetrisStrategy.#continue()                   // 动作：继续游戏
                    break
                case GameTetris.#GAMEOVER:
                    this.#tetrisStrategy.#reset()
                    break
            }
        })

        this.#btnReset.addEventListener('click', () => {
            GameTetris.#PK_OVER = false
            this.#reset()
        })

        this.addEventListener('gameover', () => {
            this.#tetrisStrategy.gameover()
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case GameTetris.#START_KEY:
                    this.#btnStart.click()
                    break
                case GameTetris.#RESET_KEY:
                    this.#btnReset.click()
                    break
            }
        })
    }
}

customElements.define('game-tetris', GameTetris)