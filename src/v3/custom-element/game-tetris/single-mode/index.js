import TetrisStrategy from '../TetrisStrategy.js'
import Base from '../../js/CustomBase.js'
import GameContext from '../../game-context/index.js'

class SingleMode extends TetrisStrategy {

    // 私有变量
    #context;    // <game-context>

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/single-mode/index.css'))
        this.#context = Base.create('game-context')
        shadow.appendChild(this.#context)
    }

    start() {
        this.#context.start()
    }

    pause() {
        this.#context.pause()
    }

    continue() {
        this.#context.continue()
    }

    reset() {
        GameContext.reset()  // 重置全局类
        this.#context.reset(true)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        this.#context.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
    }

    gameover() { }
}

customElements.define('single-mode', SingleMode)