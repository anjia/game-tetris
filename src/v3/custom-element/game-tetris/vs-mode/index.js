import Base from '../../js/CustomBase.js'
import TetrisStrategy from '../TetrisStrategy.js'
import GameContext from '../../game-context/index.js'

class VSMode extends TetrisStrategy {

    // 私有变量
    #context = [];    // <game-context>[]
    #_people;
    #_games;


    #overCounter = 0
    #PK_OVER = false

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性
        this.people = this.getAttribute('people')
        this.games = this.getAttribute('games')

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/vs-mode/index.css'))

        shadow.appendChild(this.#context[0])
        for (let i = 1; i < this.#_people; i++) {
            let text = Base.create('div', { 'text': 'VS' })
            let children = [text]
            // if (i === 1) {
            //     children.push(this.#btnWrap)
            // }
            shadow.appendChild(Base.create('div', { 'class': 'gap' }, children))
            shadow.appendChild(this.#context[i])
        }
    }


    set people(x) {
        x = parseInt(x) || 1
        if (x === this.#_people) return
        this.#_people = x

        this.#PK_OVER = false
        this.reset()

        this.#context = []
        for (let i = 0; i < this.#_people; i++) {
            this.#context.push(Base.create('game-context', { 'people': this.#_people, 'games': this.#_games, 'key': i }))
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

    start() {
        for (let c of this.#context) {
            c.start()
        }
    }

    pause() {
        for (let c of this.#context) {
            c.pause()
        }
    }

    continue() {
        for (let c of this.#context) {
            c.continue()
        }
    }

    reset() {
        this.#overCounter = 0
        GameContext.reset()  // 重置全局类

        for (let c of this.#context) {
            c.reset(this.#PK_OVER)     // 重置其它元素，比如 <clear-lines>, <win-counter>
            c.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
        }
    }

    gameover() {
        this.#overCounter++
        if (this.#overCounter === this.#_people) {
            // this.#status = GameTetris.#GAMEOVER
            // 比分数（谁多谁赢），如果赢的场次等于最大场次了，游戏就结束了
            const key = parseInt(GameContext.winner)
            if (key >= 0 && this.#context[key].win()) {
                this.#PK_OVER = true
            }
        }
    }
}

customElements.define('vs-mode', VSMode)