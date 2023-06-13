import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'


class TetrisStrategy extends Base {

    // 私有变量
    #_people;
    #_games;
    #overCounter = 0
    #context = [];    // <game-context>[]
    #PK_OVER = false




    constructor() {
        super()
    }

    connectedCallback() {
    }

    get context() {
        return this.#context
    }
    get people() {
        return this.#_people
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

    // set games(x) { }
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
            c.reset(this.#PK_OVER)   // 重置其它元素，比如 <clear-lines>, <win-counter>
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

export default TetrisStrategy