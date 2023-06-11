import GameContext from '../game-context/index.js'

import TetrisStrategy from '../TetrisStrategy.js'

class VSMode extends TetrisStrategy {

    // 私有变量
    #_people;
    #_games;

    #PK_OVER = false
    #overCounter = 0
    #context = [];    // <game-context>[]

    constructor() {
        this.#domList.parentElement.className = 'vs'
        this.#domList.appendChild(this.#context[0])
        for (let i = 1; i < this.#_people; i++) {
            let text = Base.create('div', { 'text': 'VS' })
            let children = [text]
            if (i === 1) {
                children.push(this.#btnWrap)
            }
            this.#domList.appendChild(Base.create('div', { 'class': 'gap' }, children))
            this.#domList.appendChild(this.#context[i])
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
        this.#status = GameTetris.#PREPARING
        this.#overCounter = 0

        GameContext.reset()  // 重置全局类
        for (let c of this.#context) {
            c.reset(GameTetris.#PK_OVER)   // 重置其它元素，比如 <clear-lines>, <win-counter>
            c.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
        }
    }

    gameover() {
        this.#overCounter++
        if (this.#overCounter === this.#_people) {
            this.#status = GameTetris.#GAMEOVER
            // 比分数（谁多谁赢），如果赢的场次等于最大场次了，游戏就结束了
            const key = parseInt(GameContext.winner)
            if (key >= 0 && this.#context[key].win()) {
                GameTetris.#PK_OVER = true
            }
        }
    }
}

customElements.define('vs-mode', VSMode)